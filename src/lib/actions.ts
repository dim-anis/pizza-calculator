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

export async function createOrUpdateFolder(
  folderData: FolderForm,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
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

export async function createRecipe(data: RecipeForm): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

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

    const { name, ingredients, folders, servings, notes } = validatedData;

    await prisma.recipe.create({
      data: {
        user: { connect: { id: user.id } },
        name,
        ingredients: {
          create: ingredients.map((ir) => ({
            ingredientId: ir.ingredientId,
            weightInGrams: ir.weightInGrams / servings,
          })),
        },
        servings,
        folders: {
          connect: folders.map((folder) => ({
            userId_name: { userId: user.id, name: folder.name },
          })),
        },
        notes,
      },
    });
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
  redirect("/dashboard/recipes");
}

export async function updateRecipe(data: RecipeForm): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

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

    const {
      id,
      name,
      ingredients: newIngredients,
      folders,
      servings,
      notes,
    } = validatedData;

    await prisma.recipe.update({
      where: {
        userId: user.id,
        id,
      },
      data: {
        user: { connect: { id: user.id } },
        name,
        ingredients: {
          deleteMany: {},
          createMany: {
            data: newIngredients.map((ir) => ({
              ingredientId: ir.ingredientId,
              weightInGrams: ir.weightInGrams / servings,
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
      },
    });
  } catch (e) {
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
  redirect("/dashboard/recipes");
}

export async function createOrUpdateIngredient(
  data: IngredientForm,
  prevIngredientName?: string,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const parsed = ingredientFormSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: parseZodIssues(parsed.error.issues),
      };
    }

    if (prevIngredientName) {
      await prisma.ingredient.update({
        where: {
          userId_name: {
            userId: user.id,
            name: prevIngredientName,
          },
        },
        data: {
          name: parsed.data.name,
          typeId: parsed.data.typeId,
        },
      });
    } else {
      await prisma.ingredient.create({
        data: {
          userId: user.id,
          name: parsed.data.name,
          typeId: parsed.data.typeId,
        },
      });
    }
  } catch (e) {
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

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}
