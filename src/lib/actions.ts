"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { getCurrentUser } from "./session";
import { redirect } from "next/navigation";
import { parseZodIssues } from "@/lib/helpers";
import {
  RecipeForm,
  recipeSchema,
  ActionState,
  FolderForm,
  folderFormSchema,
  IngredientForm,
  ingredientFormSchema,
} from "@/lib/types";
import { Prisma } from "@prisma/client";
import { ratelimit } from "./limiter";

export async function createOrUpdateFolder(
  folderData: FolderForm,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  let folderId;

  try {
    const { id, name } = folderFormSchema.parse(folderData);

    if (id) {
      await prisma.folder.upsert({
        where: {
          id,
        },
        update: {
          name,
        },
        create: {
          userId: user.id,
          name,
        },
      });

      folderId = id;
    } else {
      const res = await prisma.folder.create({
        data: {
          userId: user.id,
          name,
        },
      });

      folderId = res.id;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        // Unique constraint violation (Prisma example)
        return {
          success: false,
          message: "Title must be unique",
          errors: { name: ["Folder title already exists"] },
        };
      }
    } else {
      return {
        success: false,
        message: "Unexpected error, try again",
      };
    }
  }

  revalidatePath("/dashboard/folders");
  redirect(`/dashboard${folderId ? `/folders/${folderId}` : ""}`);
}

export async function deleteFolder(folderId: string): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
        userId: user?.id,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Unexpected error, try again",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteIngredient(id: number): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  try {
    await prisma.ingredient.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/ingredients");
}

export async function deleteRecipe(id: number): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  try {
    await prisma.recipe.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/recipes");
  redirect("/dashboard/recipes");
}

export async function createOrUpdateRecipe(
  data: RecipeForm,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  let recipeId;

  try {
    const {
      success,
      error,
      data: validatedData,
    } = recipeSchema.safeParse(data);

    if (!success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: parseZodIssues(error.issues),
      };
    }

    const { id, name, ingredients, folders, servings, notes } = validatedData;

    const payload = {
      user: { connect: { id: user.id } },
      name,
      ingredients: {
        createMany: {
          data: ingredients.map((ir) => ({
            ingredientId: ir.ingredient.id,
            weightInGrams: ir.weightInGrams,
          })),
        },
      },
      servings,
      folders: {
        set: folders.map(({ name }) => ({
          userId_name: { userId: user.id, name },
        })),
      },
      notes,
    };

    if (id) {
      await prisma.recipe.update({
        where: {
          userId: user.id,
          id,
        },
        data: {
          ...payload,
          ingredients: { deleteMany: {}, ...payload.ingredients },
        },
      });

      recipeId = id;
    } else {
      await prisma.recipe.create({
        data: {
          ...payload,
          folders: {
            connect: folders.map((folder) => ({
              userId_name: { userId: user.id, name: folder.name },
            })),
          },
          notes,
        },
      });

      recipeId = id;
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        // Unique constraint violation (Prisma example)
        return {
          success: false,
          message: "Title must be unique",
          errors: { name: ["Recipe title already exists"] },
        };
      }
    } else {
      return {
        success: false,
        message: "Unexpected error, try again",
      };
    }
  }

  revalidatePath("/dashboard/recipes");
  redirect(`/dashboard${recipeId ? `/recipes/${recipeId}` : ""}`);
}

export async function createOrUpdateIngredient(
  data: IngredientForm,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new Error("Too many requests");
  }

  try {
    const {
      success,
      error,
      data: ingredient,
    } = ingredientFormSchema.safeParse(data);

    if (!success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: parseZodIssues(error.issues),
      };
    }

    const ingredientType = await prisma.ingredientType.findFirst({
      where: { type: ingredient.type },
    });

    if (!ingredientType) {
      return {
        success: false,
        message: "Ingredient type doesn't exist",
      };
    }

    if (ingredient.id) {
      await prisma.ingredient.update({
        where: {
          id: ingredient.id,
        },
        data: {
          name: ingredient.name,
          typeId: ingredientType.id,
          components: {
            deleteMany: {},
            create: ingredient.components.map((comp) => ({
              ingredientId: comp.ingredient.id,
              weightInGrams: comp.weightInGrams,
            })),
          },
        },
      });
    } else {
      await prisma.$transaction(async (tx) => {
        const parentIngredient = await tx.ingredient.create({
          data: {
            userId: user.id,
            name: ingredient.name,
            typeId: ingredientType.id,
          },
        });

        await tx.ingredientComponent.createMany({
          data: ingredient.components.map((ir) => ({
            parentId: parentIngredient.id,
            ingredientId: ir.ingredient.id,
            weightInGrams: ir.weightInGrams,
          })),
        });
      });
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Unexpected error, try again",
    };
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}
