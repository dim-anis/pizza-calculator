"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { redirect } from "next/navigation";
import {
  getTotalDoughWeight,
  ingredientQuantitiesToRatios,
} from "@/app/_utils/helpers";
import {
  CreateRecipeData,
  CreateRecipeSchema,
} from "@/app/myrecipes/[folder]/new-recipe/definitions";
import {
  CreateFolder,
  CreateFolderSchema,
} from "@/app/myrecipes/new-folder/definitions";

export async function createFolder(folderData: CreateFolder) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = CreateFolderSchema.safeParse(folderData);

  if (!zodResult.success) {
    const { error } = zodResult;
    return error;
  }

  const {
    data: { name },
  } = zodResult;

  try {
    const newFolder = await prisma.folder.create({
      data: {
        userId: user.id,
        name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Folder",
    };
  }

  const encodedFolderName = encodeURIComponent(name);

  revalidatePath("/myrecipes");
  redirect(`/myrecipes/${encodedFolderName}`);
}

export async function updateFolder(oldName: string, folderData: CreateFolder) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = CreateFolderSchema.safeParse(folderData);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { name },
  } = zodResult;

  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        name: oldName,
        userId: user.id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Folder",
    };
  }

  const encodedFolderName = encodeURIComponent(name);

  revalidatePath(`/myrecipes/${encodedFolderName}`);
  redirect(`/myrecipes/${encodedFolderName}`);
}

export async function deleteFolder(folderId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const deletedFolder = await prisma.folder.delete({
    where: {
      id: folderId,
      userId: user?.id,
    },
  });

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}

export async function deleteRecipe(folderName: string, recipeId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const deletedRecipe = await prisma.recipe.delete({
    where: {
      id: recipeId,
      userId: user?.id,
    },
  });

  revalidatePath("/myrecipes");
  redirect(`/myrecipes/${folderName}`);
}

export async function createRecipe(folderName: string, data: CreateRecipeData) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = CreateRecipeSchema.safeParse(data);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { recipeName, numOfDoughballs, ingredients, optionalIngredients },
  } = zodResult;

  const folders = ["All"];
  if (folderName !== "All") {
    folders.push(folderName);
  }

  const allIngredients = {
    ...ingredients,
    ...optionalIngredients,
  };
  const ratios = ingredientQuantitiesToRatios(allIngredients);
  const doughballWeight = getTotalDoughWeight(allIngredients) / numOfDoughballs;

  try {
    const savedRecipe = await prisma.recipe.create({
      data: {
        userId: user.id,
        name: recipeName,
        folders: {
          connect: [...folders.map((folder) => ({ name: folder }))],
        },
        doughballWeight,
        ...ratios,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/myrecipes");
  redirect(`/myrecipes/${folderName}`);
}
