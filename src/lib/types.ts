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
    select: {
      name: true,
      servings: true,
      ingredients: {
        omit: { id: true, recipeId: true },
        include: {
          ingredient: {
            omit: { id: true, userId: true, typeId: true },
            include: { type: { select: { isLiquid: true } } },
          },
        },
      },
    },
  });

export type RecipeWithIngredients = Prisma.RecipeGetPayload<
  typeof recipeWithIngredients
>;

// TODO: clean up ingredient type
export type RecipeWithGroupedIngredients = Omit<
  RecipeWithIngredients,
  "ingredients"
> & {
  servingWeight: number;
  ingredients: {
    flours: (RecipeWithIngredients["ingredients"][number] & {
      percentage: number;
    })[];
    liquids: (RecipeWithIngredients["ingredients"][number] & {
      percentage: number;
    })[];
    others: (RecipeWithIngredients["ingredients"][number] & {
      percentage: number;
    })[];
  };
};

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
  recipeId: z.number().optional(),
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
  id: z.number().optional(),
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
  id: z.number().optional(),
  name: z.string(),
  ingredients: z.object({
    liquids: z
      .array(bakersFormulaIngredientSchema)
      .min(1, "At least one ingredient is required"),
    flours: z
      .array(bakersFormulaIngredientSchema)
      .min(1, "At least one ingredient is required")
      .refine((data) => data.some(({ ingredient }) => ingredient.isFlour), {
        message: "At least one ingredient must be flour-based",
      }),
    others: z.array(bakersFormulaIngredientSchema),
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

export const folderFormSchema = z.object({
  id: z.string().optional(),
  name: z.coerce.string().min(1, { message: "Folder name is required." }),
});

export type FolderForm = z.infer<typeof folderFormSchema>;

export const foldersWithCount = Prisma.validator<Prisma.FolderDefaultArgs>()({
  select: { id: true, name: true, _count: { select: { recipes: true } } },
});

export type FolderWithCount = Prisma.FolderGetPayload<typeof foldersWithCount>;

export const ingredientTypeWithCount =
  Prisma.validator<Prisma.IngredientTypeDefaultArgs>()({
    select: { id: true, type: true, _count: { select: { ingredients: true } } },
  });

export type IngredientTypeWithCount = Prisma.IngredientTypeGetPayload<
  typeof ingredientTypeWithCount
>;

export const ingredientFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  typeId: z.coerce.number(),
  isFlour: z.boolean(),
});

export type IngredientForm = z.infer<typeof ingredientFormSchema>;
