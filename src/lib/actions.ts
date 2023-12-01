"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { redirect } from "next/navigation";
import {
  getTotalDoughWeight,
  ingredientQuantitiesToRatios,
} from "@/lib/helpers";
import {
  CreateRecipeData,
  CreateRecipeSchema,
} from "@/app/(myrecipes)/myrecipes/[folder]/new-recipe/definitions";
import {
  CreateFolder,
  CreateFolderSchema,
} from "@/app/(myrecipes)/myrecipes/new-folder/definitions";

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

export async function createRecipe(data: CreateRecipeData) {
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
    data: {
      name,
      numOfDoughballs,
      flourAmount,
      waterAmount,
      saltAmount,
      yeastAmount,
      oilAmount,
      sugarAmount,
      selectedFolders,
      notes,
    },
  } = zodResult;

  const allIngredients = {
    flourAmount,
    waterAmount,
    saltAmount,
    yeastAmount,
    oilAmount,
    sugarAmount,
  };
  const ingredientRatios = ingredientQuantitiesToRatios(allIngredients);
  const doughballWeight = getTotalDoughWeight(allIngredients) / numOfDoughballs;

  try {
    const savedRecipe = await prisma.recipe.create({
      data: {
        userId: user.id,
        name,
        folders: {
          connect: [
            ...["All", ...selectedFolders].map((folder) => ({ name: folder })),
          ],
        },
        doughballWeight,
        ...ingredientRatios,
        notes,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}

export async function updateRecipe(
  recipeId: string,
  connectedFolders: { id: string; name: string }[],
  data: CreateRecipeData,
) {
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
    data: {
      name,
      numOfDoughballs,
      flourAmount,
      waterAmount,
      saltAmount,
      yeastAmount,
      oilAmount,
      sugarAmount,
      selectedFolders: updatedFolderSelection,
      notes,
    },
  } = zodResult;

  const allIngredients = {
    flourAmount,
    waterAmount,
    saltAmount,
    yeastAmount,
    oilAmount,
    sugarAmount,
  };
  const ingredientRatios = ingredientQuantitiesToRatios(allIngredients);
  const doughballWeight = getTotalDoughWeight(allIngredients) / numOfDoughballs;

  const foldersToConnect = updatedFolderSelection.filter(
    (newFolderName) =>
      !connectedFolders.some((folder) => folder.name === newFolderName),
  );

  const foldersToDisconnect = connectedFolders.filter(
    (folder) => !updatedFolderSelection.includes(folder.name),
  );

  try {
    const savedRecipe = await prisma.recipe.update({
      where: {
        userId: user.id,
        id: recipeId,
      },
      data: {
        userId: user.id,
        name,
        folders: {
          connect: [...foldersToConnect.map((folder) => ({ name: folder }))],
          disconnect: [
            ...foldersToDisconnect.map((folder) => ({ name: folder.name })),
          ],
        },
        notes,
        doughballWeight,
        ...ingredientRatios,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}
