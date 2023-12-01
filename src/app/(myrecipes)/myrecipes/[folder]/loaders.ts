import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getAllFolders() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });

  return folders.sort((a, b) => {
    if (a.name === "All") return -1; // "All" comes first
    if (b.name === "All") return 1; // "All" comes first
    return 0;
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
      name: folderName,
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

export type RecipeWithFolders = Prisma.RecipeGetPayload<{
  include: {
    folders: {
      select: {
        id: true;
        name: true;
        createdAt: true;
      };
    };
  };
}>;

export async function getRecipeWithFolders(
  recipeId: string,
): Promise<RecipeWithFolders> {
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
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Failed to fetch the recipe!");
  }

  return recipe;
}

const foldersWithCount = Prisma.validator<Prisma.FolderDefaultArgs>()({
  select: { id: true, name: true, _count: { select: { recipes: true } } },
});

type FolderWithCount = Prisma.FolderGetPayload<typeof foldersWithCount>;

export async function getFolderNamesWithRecipeCount(): Promise<
  FolderWithCount[]
> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
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

  return folders.sort((a, b) => {
    if (a.name === "All") return -1; // "All" comes first
    if (b.name === "All") return 1; // "All" comes first
    return 0;
  });
}
