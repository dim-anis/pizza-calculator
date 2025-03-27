import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { FolderWithCount } from "./types";

export async function getAllFolders() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });
}

export async function getAllIngredients() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.ingredient.findMany({
    where: {
      userId: user.id,
    },
  });
}

export async function getRecipesGroupedByFolder() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
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
  return await prisma.recipe.findMany({
    where: {
      userId: null,
    },
    include: {
      recipeServing: true,
      ingredients: {
        include: {
          ingredient: { include: { type: { select: { isLiquid: true } } } },
        },
      },
      folders: true,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });
}

export async function getAllRecipes() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
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
    redirect("/login");
  }

  const folder = await prisma.folder.findUnique({
    where: {
      userId: user.id,
      userId_name: {
        name: folderName,
        userId: user.id,
      },
    },
    include: {
      recipes: {
        orderBy: {
          ["createdAt"]: "desc",
        },
      },
    },
  });

  if (!folder) {
    throw new Error("Failed to fetch folder!");
  }

  return folder;
}

export async function getRecipeWithIngredientsWithWeightsWithFolders(
  recipeId: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      userId: user.id,
      id: recipeId,
    },
    include: {
      recipeServing: true,
      ingredients: { include: { ingredient: true } },
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Failed to fetch the recipe!");
  }

  return recipe;
}

export async function getRecipeWithIngredientsWithFolders(recipeId: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      userId: user.id,
      id: recipeId,
    },
    include: {
      recipeServing: true,
      ingredients: {
        include: {
          ingredient: { include: { type: { select: { isLiquid: true } } } },
        },
      },
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Failed to fetch the recipe!");
  }

  return recipe;
}

export async function getFolderNamesWithRecipeCount(): Promise<
  [FolderWithCount[], number]
> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.$transaction([
    prisma.folder.findMany({
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
    }),
    prisma.recipe.count({ where: { userId: user.id } }),
  ]);
}
