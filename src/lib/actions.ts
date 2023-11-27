"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  getTotalDougWeight,
  ingredientQuantitiesToRatios,
} from "@/app/_utils/helpers";
import {
  CreateRecipeData,
  CreateRecipeSchema,
} from "@/app/myrecipes/[name]/new/definitions";

const FolderSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  userId: z.string(),
});

const CreateFolder = FolderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export async function createFolder(folderData: z.infer<typeof CreateFolder>) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = CreateFolder.safeParse(folderData);

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

  revalidatePath("/myrecipes");
}

const UpdateFolder = FolderSchema.pick({
  name: true,
});

const UpdateFolderWithOldName = UpdateFolder.extend({
  oldName: z.string(),
});

export async function updateFolder(
  folderData: z.infer<typeof UpdateFolderWithOldName>,
) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = UpdateFolderWithOldName.safeParse(folderData);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { oldName, name: newName },
  } = zodResult;

  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        name: oldName,
        userId: user.id,
      },
      data: {
        name: newName,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Folder",
    };
  }

  revalidatePath("/myrecipes");
}

const DeleteFolder = FolderSchema.pick({
  name: true,
});
export async function deleteFolder(folderData: z.infer<typeof DeleteFolder>) {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const zodResult = DeleteFolder.safeParse(folderData);

  if (!zodResult.success) {
    const { error } = zodResult;
    return { success: false, error: error.format() };
  }

  const {
    data: { name },
  } = zodResult;

  const deletedFolder = await prisma.folder.delete({
    where: {
      name,
      userId: user?.id,
    },
  });

  revalidatePath("/myrecipes");
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
  const doughballWeight = getTotalDougWeight(allIngredients) / numOfDoughballs;

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
