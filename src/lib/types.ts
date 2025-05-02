import { Prisma, IngredientTypeName } from "@prisma/client";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const recipe = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  select: {
    notes: true,
    servings: true,
    name: true,
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
    folders: true,
  },
});
export type Recipe = Prisma.RecipeGetPayload<typeof recipe>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ingredient = Prisma.validator<Prisma.RecipeIngredientDefaultArgs>()({
  select: {
    weightInGrams: true,
    ingredient: { select: { name: true, components: true, type: true } },
  },
});

export type Ingredient = Prisma.RecipeIngredientGetPayload<typeof ingredient>;

export type IngredientWithPercentage = Ingredient & {
  percentage: number;
};

export type RecipeWithGroupedIngredients = Omit<
  Recipe,
  "ingredients" | "folders"
> & {
  servingWeight: number;
  ingredients: {
    flours: IngredientWithPercentage[];
    liquids: IngredientWithPercentage[];
    others: IngredientWithPercentage[];
  };
};

export const ingredientComponent = z.object({
  id: z.number(),
  parentId: z.number(),
  ingredientId: z.number(),
  ingredient: z.object({
    name: z.string(),
    type: z.object({
      type: z.nativeEnum(IngredientTypeName),
      id: z.number(),
      description: z.string(),
    }),
  }),
  weightInGrams: z.coerce.number().positive(),
});

const ingredientSchema = z.object({
  name: z.string(),
  type: z.object({
    type: z.nativeEnum(IngredientTypeName),
    id: z.number(),
    description: z.string(),
  }),
  components: z.array(ingredientComponent).optional().default([]),
});

const recipeIngredientSchema = z.object({
  id: z.number().optional(),
  ingredientId: z.number(),
  ingredient: ingredientSchema,
  weightInGrams: z.coerce.number().positive(),
});

const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const baseRecipeSchema = z.object({
  notes: z.string().nullable().optional(),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, "At least one ingredient is required")
    .refine(
      (data) =>
        data.some(
          ({
            ingredient: {
              type: { type },
            },
          }) => type === "Flour",
        ),
      {
        message: "At least one ingredient must be flour-based",
      },
    ),
});

export const recipeSchema = baseRecipeSchema.extend({
  id: z.number().optional(),
  name: z.string(),
  folders: z.array(folderSchema),
  servings: z.coerce.number().min(1),
});

export type RecipeForm = z.infer<typeof recipeSchema>;

export const bakersFormulaIngredientSchema = recipeIngredientSchema.extend({
  percentage: z.coerce.number().positive(),
});

export const bakersFormulaSchema = z.object({
  id: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  notes: z.string().nullable().optional(),
  ingredients: z.object({
    liquids: z
      .array(bakersFormulaIngredientSchema)
      .min(1, "At least one ingredient is required"),
    flours: z
      .array(bakersFormulaIngredientSchema)
      .min(1, "At least one ingredient is required")
      .refine(
        (data) =>
          data.some(
            ({
              ingredient: {
                type: { type },
              },
            }) => type === "Flour",
          ),
        {
          message: "At least one ingredient must be flour-based",
        },
      ),
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
  type: z.nativeEnum(IngredientTypeName),
  components: z.array(ingredientComponent),
});

export type IngredientForm = z.infer<typeof ingredientFormSchema>;
