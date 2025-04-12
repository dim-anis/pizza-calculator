import { Prisma } from "@prisma/client";
import { z } from "zod";

export type MainNavItem = {
  title: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
};

export const ingredientWithType =
  Prisma.validator<Prisma.IngredientDefaultArgs>()({
    include: { type: true },
  });

export type IngredientWithType = Prisma.IngredientGetPayload<
  typeof ingredientWithType
>;

export const recipeWithIngredients =
  Prisma.validator<Prisma.RecipeDefaultArgs>()({
    omit: {
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      notes: true,
    },
    include: {
      ingredients: {
        omit: { id: true, recipeId: true },
        include: {
          ingredient: {
            select: {
              name: true,
              isFlour: true,
              type: { select: { isLiquid: true } },
            },
          },
        },
      },
    },
  });

export type RecipeWithIngredients = Prisma.RecipeGetPayload<
  typeof recipeWithIngredients
>;

export const recipeWithIngredientsWithFolders =
  Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: {
      ingredients: { include: { ingredient: { include: { type: true } } } },
      folders: {
        select: { id: true, name: true, createdAt: true },
      },
    },
  });

export type RecipeWithIngredientsWithFolders = Prisma.RecipeGetPayload<
  typeof recipeWithIngredientsWithFolders
>;

const recipeIngredientSchema = z.object({
  id: z.number().optional(),
  recipeId: z.string().optional(),
  ingredientId: z.number(),
  ingredient: z.object({
    name: z.string(),
    isFlour: z.boolean(),
    type: z.object({
      isLiquid: z.boolean(),
    }),
  }),
  weightInGrams: z.coerce.number().positive(),
});

const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const recipeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, "At least one ingredient is required")
    .refine((data) => data.some(({ ingredient }) => ingredient.isFlour), {
      message: "At least one ingredient must be flour-based",
    }),
  folders: z.array(folderSchema),
  servings: z.coerce.number().min(1),
});

export type RecipeForm = z.infer<typeof recipeSchema>;
export type IngredientWithWeight = z.infer<typeof recipeIngredientSchema>;

export const bakersFormulaIngredientSchema = recipeIngredientSchema.extend({
  percentage: z.coerce.number().positive(),
});

export const bakersFormulaSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  ingredients: z
    .array(bakersFormulaIngredientSchema)
    .min(1, "At least one ingredient is required")
    .refine((data) => data.some(({ ingredient }) => ingredient.isFlour), {
      message: "At least one ingredient must be flour-based",
    }),
  servings: z.coerce.number().min(1),
  servingWeight: z.coerce.number().min(1),
});

export type BakersFormulaForm = z.infer<typeof bakersFormulaSchema>;
export type BakersFormulaIngredient = z.infer<
  typeof bakersFormulaIngredientSchema
>;

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const createFolderSchema = z.object({
  name: z.coerce.string().min(1, { message: "Folder name is required." }),
});

export type CreateFolder = z.infer<typeof createFolderSchema>;

export const foldersWithCount = Prisma.validator<Prisma.FolderDefaultArgs>()({
  select: { id: true, name: true, _count: { select: { recipes: true } } },
});

export type FolderWithCount = Prisma.FolderGetPayload<typeof foldersWithCount>;
