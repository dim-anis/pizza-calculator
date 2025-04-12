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
  CreateFolder,
  createFolderSchema,
} from "@/lib/types";
import { Prisma } from "@prisma/client";

export async function createFolder(
  folderData: CreateFolder,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const { name } = createFolderSchema.parse(folderData);
    await prisma.folder.create({
      data: {
        userId: user.id,
        name,
      },
    });
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

  revalidatePath("/myrecipes");
  redirect(`/myrecipes/${encodeURIComponent(folderData.name)}`);
}

export async function updateFolder(
  oldName: string,
  folderData: CreateFolder,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const { name } = createFolderSchema.parse(folderData);
    await prisma.folder.update({
      where: {
        userId_name: {
          userId: user.id,
          name: oldName,
        },
      },
      data: {
        name,
      },
    });
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

  revalidatePath(`/myrecipes/${encodeURIComponent(folderData.name)}`);
  redirect(`/myrecipes/${encodeURIComponent(folderData.name)}`);
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

  revalidatePath("/myrecipes");
  redirect("/myrecipes");
}

export async function deleteRecipe(recipeId: string): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    await prisma.recipe.delete({
      where: {
        id: recipeId,
        userId: user.id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes");
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

  revalidatePath("/myrecipes");
  redirect("/myrecipes");
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

  revalidatePath("/myrecipes");
  redirect("/myrecipes");
}
