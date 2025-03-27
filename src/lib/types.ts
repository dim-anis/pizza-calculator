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

export const recipeWithIngredients =
  Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: {
      recipeServing: { omit: { id: true } },
      ingredients: {
        include: {
          ingredient: {
            select: { name: true, type: { select: { isLiquid: true } } },
          },
        },
      },
    },
  });

export type RecipeWithIngredients = Prisma.RecipeGetPayload<
  typeof recipeWithIngredients
>;

export const recipeIngredientWithName =
  Prisma.validator<Prisma.RecipeIngredientDefaultArgs>()({
    include: {
      ingredient: {
        select: { name: true, type: { select: { isLiquid: true } } },
      },
    },
  });

export type RecipeIngredientWithName = Prisma.RecipeIngredientGetPayload<
  typeof recipeIngredientWithName
>;

export const recipeWithIngredientsWithFolders =
  Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: {
      recipeServing: { omit: { id: true } },
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
  }),
  weight: z.coerce.number().positive(),
});

const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const recipeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  notes: z.string().nullish(),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, "At least one ingredient is required")
    .refine((data) => data.some(({ ingredient }) => ingredient.isFlour), {
      message: "At least one ingredient must be flour-based",
    }),
  folders: z.array(folderSchema),
  recipeServing: z.object({
    quantity: z.coerce.number().min(1),
    weight: z.coerce.number().optional(),
  }),
});

export type RecipeForm = z.infer<typeof recipeSchema>;
export type IngredientWithWeight = z.infer<typeof recipeIngredientSchema>;

export const bakersFormulaIngredientSchema = z.object({
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
  recipeServing: z.object({
    quantity: z.coerce.number().min(1),
    weight: z.coerce.number().min(1),
  }),
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
