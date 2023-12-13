"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { redirect } from "next/navigation";
import {
  catchError,
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
import { ActionState } from "./definitions";

export async function createFolder(
  folderData: CreateFolder,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const { name } = CreateFolderSchema.parse(folderData);
    await prisma.folder.create({
      data: {
        userId: user.id,
        name,
      },
    });
  } catch (e) {
    return catchError(e);
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
    const { name } = CreateFolderSchema.parse(folderData);
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
    return catchError(e);
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
    return catchError(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}

export async function deleteRecipe(
  folderName: string,
  recipeId: string,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    await prisma.recipe.delete({
      where: {
        id: recipeId,
        userId: user?.id,
      },
    });
  } catch (e) {
    return catchError(e);
  }

  revalidatePath("/myrecipes");
  redirect(`/myrecipes/${folderName}`);
}

export async function createRecipe(
  data: CreateRecipeData,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const {
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
    } = CreateRecipeSchema.parse(data);

    const allIngredients = {
      flourAmount,
      waterAmount,
      saltAmount,
      yeastAmount,
      oilAmount,
      sugarAmount,
    };
    const ingredientRatios = ingredientQuantitiesToRatios(allIngredients);
    const doughballWeight =
      getTotalDoughWeight(allIngredients) / numOfDoughballs;

    await prisma.recipe.create({
      data: {
        userId: user.id,
        name,
        folders: {
          connect: [
            ...["All", ...selectedFolders].map((folder) => ({
              userId_name: { userId: user.id, name: folder },
            })),
          ],
        },
        doughballWeight,
        ...ingredientRatios,
        notes,
      },
    });
  } catch (e) {
    return catchError(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}

export async function updateRecipe(
  recipeId: string,
  connectedFolders: { id: string; name: string }[],
  data: CreateRecipeData,
): Promise<ActionState> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized");
  }

  try {
    const {
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
    } = CreateRecipeSchema.parse(data);

    const allIngredients = {
      flourAmount,
      waterAmount,
      saltAmount,
      yeastAmount,
      oilAmount,
      sugarAmount,
    };
    const ingredientRatios = ingredientQuantitiesToRatios(allIngredients);
    const doughballWeight =
      getTotalDoughWeight(allIngredients) / numOfDoughballs;

    const foldersToConnect = updatedFolderSelection.filter(
      (newFolderName) =>
        !connectedFolders.some((folder) => folder.name === newFolderName),
    );

    const foldersToDisconnect = connectedFolders.filter(
      (folder) => !updatedFolderSelection.includes(folder.name),
    );

    await prisma.recipe.update({
      where: {
        userId: user.id,
        id: recipeId,
      },
      data: {
        userId: user.id,
        name,
        folders: {
          connect: [
            ...foldersToConnect.map((folder) => ({
              userId_name: { userId: user.id, name: folder },
            })),
          ],
          disconnect: [
            ...foldersToDisconnect.map((folder) => ({
              userId_name: { userId: user.id, name: folder.name },
            })),
          ],
        },
        notes,
        doughballWeight,
        ...ingredientRatios,
      },
    });
  } catch (e) {
    return catchError(e);
  }

  revalidatePath("/myrecipes");
  redirect("/myrecipes/all");
}
