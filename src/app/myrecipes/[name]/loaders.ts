import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Folder } from "@prisma/client";

export async function getAllFolders() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  return folders.filter((folder) => folder.name !== "All");
}

export async function getRecipesGroupedByFolder() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  return await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
    include: {
      recipes: true,
    },
  });
}

export async function getDefaultRecipes() {
  const recipes = await prisma.recipe.findMany({
    where: {
      userId: null,
    },
    select: {
      id: true,
      name: true,
      doughballWeight: true,
      flourRatio: true,
      waterRatio: true,
      saltRatio: true,
      yeastRatio: true,
      oilRatio: true,
      sugarRatio: true,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });

  return recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    doughballWeight: recipe.doughballWeight,
    ingredientRatios: {
      flour: Number(recipe.flourRatio),
      water: Number(recipe.waterRatio),
      salt: Number(recipe.saltRatio),
      yeast: Number(recipe.yeastRatio),
      oil: Number(recipe.oilRatio),
      sugar: Number(recipe.sugarRatio),
    },
  }));
}

export async function getAllRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  return await prisma.recipe.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });
}

export async function getFolderWithRecipes(folderName: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  return await prisma.folder.findUnique({
    where: {
      userId: user.id,
      name: folderName,
    },
    include: {
      recipes: true,
    },
  });
}

export async function getRecipeById(recipeId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      userId: user.id,
      id: recipeId,
    },
    select: {
      id: true,
      name: true,
      doughballWeight: true,
      flourRatio: true,
      waterRatio: true,
      saltRatio: true,
      oilRatio: true,
      sugarRatio: true,
      yeastRatio: true,
      folders: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
    },
  });

  if (!recipe) {
    throw new Error("Failed to fetch the recipe!");
  }

  return {
    id: recipe.id,
    name: recipe.name,
    doughballWeight: recipe.doughballWeight,
    folders: recipe.folders,
    ingredientRatios: {
      flour: Number(recipe.flourRatio),
      water: Number(recipe.waterRatio),
      salt: Number(recipe.saltRatio),
      yeast: Number(recipe.yeastRatio),
      oil: Number(recipe.oilRatio),
      sugar: Number(recipe.sugarRatio),
    },
  };
}

type FolderWithIdNameRecipeCount = Omit<
  Folder,
  "userId" | "createdAt" | "updatedAt"
> & { _count: { recipes: number } };

export async function getFolderNamesWithRecipeCount(): Promise<
  FolderWithIdNameRecipeCount[]
> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You're not authorized!");
  }

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          recipes: true,
        },
      },
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });

  const sortedFolders = [...folders].sort((a, b) => {
    if (a.name === "All") return -1; // "All" comes first
    if (b.name === "All") return 1; // "All" comes first
    return a.name.localeCompare(b.name); // Sort the rest alphabetically
  });

  return sortedFolders;
}
