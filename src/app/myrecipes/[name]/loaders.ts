import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Folder } from "@prisma/client";

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
      folders: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
      ingredients: {
        select: {
          proportion: true,
          ingredient: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!recipe) {
    throw new Error("Failed to fetch the recipe!");
  }

  const ingredients = recipe.ingredients.map((item) => ({
    name: item.ingredient.name,
    proportion: Number(item.proportion),
  }));

  return {
    ...recipe,
    ingredients,
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
