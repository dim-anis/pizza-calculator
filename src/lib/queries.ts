import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  FolderWithCount,
  IngredientTypeWithCount,
  RecipeWithGroupedIngredients,
} from "./types";
import { calculateIngredientRatios, getTotalDoughWeight } from "./helpers";
import { IngredientTypeName } from "@prisma/client";

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

export async function getIngredients(params?: { type?: IngredientTypeName }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.ingredient.findMany({
    where: {
      userId: user.id,
      ...(params && params.type ? { type: { type: params.type } } : {}),
    },
    include: {
      type: true,
      components: { include: { ingredient: { include: { type: true } } } },
    },
  });
}

export async function getIngredientById(id: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const ingredient = await prisma.ingredient.findUnique({
    where: { id },
    include: {
      type: true,
      components: { include: { ingredient: { include: { type: true } } } },
    },
  });

  if (!ingredient) {
    throw new Error("Ingredient not found");
  }

  return ingredient;
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

export async function getDefaultRecipes(): Promise<
  RecipeWithGroupedIngredients[]
> {
  const user = await getCurrentUser();

  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [{ userId: null }, { userId: user?.id }],
    },
    include: {
      ingredients: {
        include: {
          ingredient: {
            include: {
              type: true,
              components: {
                include: { ingredient: { include: { type: true } } },
              },
            },
          },
        },
      },
    },
  });

  return recipes.map((r) => {
    const totalFlourWeight = r.ingredients.reduce(
      (
        total,
        {
          ingredient: {
            type: { type: ingredientType },
          },
          weightInGrams,
        },
      ) => total + (ingredientType === "Flour" ? weightInGrams : 0),
      0,
    );

    return {
      ...r,
      servingWeight: getTotalDoughWeight(r.ingredients) / r.servings,
      ingredients: {
        flours: calculateIngredientRatios(
          r.ingredients.filter(
            ({
              ingredient: {
                type: { type: ingredientType },
              },
            }) => ingredientType === "Flour",
          ),
          totalFlourWeight,
        ),
        liquids: calculateIngredientRatios(
          r.ingredients.filter(
            ({
              ingredient: {
                type: { type: ingredientType },
              },
            }) => ingredientType === "Liquid",
          ),
          totalFlourWeight,
        ),
        others: calculateIngredientRatios(
          r.ingredients.filter(
            ({
              ingredient: {
                type: { type: ingredientType },
              },
            }) => ingredientType !== "Flour" && ingredientType !== "Liquid",
          ),
          totalFlourWeight,
        ),
      },
    };
  });
}

export async function getRecipesWithIngredient(ingredientId: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.recipe.findMany({
    where: {
      userId: user.id,
      ingredients: { some: { ingredient: { id: ingredientId } } },
    },
    include: {
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
    include: { folders: true },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });
}

export async function getRecipeWithFolders(id: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Folder not found");
  }

  return recipe;
}

export async function getFolderById(folderId: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
    include: {
      recipes: {
        orderBy: {
          ["createdAt"]: "desc",
        },
        include: {
          folders: true,
        },
      },
    },
  });

  if (!folder) {
    throw new Error("Folder not found");
  }

  return folder;
}

export async function getRecipeWithIngredientsWithWeightsWithFolders(
  recipeId: number,
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
      ingredients: { include: { ingredient: true } },
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  return recipe;
}

export async function getRecipeWithIngredientsWithFolders(recipeId: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      userId: user.id,
      id: recipeId,
    },
    select: {
      id: true,
      name: true,
      notes: true,
      servings: true,
      ingredients: {
        select: {
          weightInGrams: true,
          id: true,
          ingredient: {
            select: {
              id: true,
              name: true,
              type: true,
              components: {
                select: {
                  parentId: true,
                  weightInGrams: true,
                  ingredient: { select: { id: true, name: true, type: true } },
                },
              },
            },
          },
        },
      },
      folders: true,
    },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
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

export async function getIngredientTypesWithCount(): Promise<
  [IngredientTypeWithCount[], number]
> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.$transaction([
    prisma.ingredientType.findMany({
      select: {
        id: true,
        type: true,
        _count: {
          select: {
            ingredients: { where: { userId: user.id } },
          },
        },
      },
    }),
    prisma.ingredient.count({ where: { userId: user.id } }),
  ]);
}

export async function getIngredientTypes() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return await prisma.ingredientType.findMany();
}
