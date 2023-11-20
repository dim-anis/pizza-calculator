import { Folder, Recipe } from "@prisma/client";

export type PizzaRecipe = {
  id: number;
  name: string;
  ingredients: {
    flour: number;
    water: number;
    salt?: number;
    yeast?: number;
    oil?: number;
    sugar?: number;
  };
  settings: {
    number_of_pizzas: number;
    weight_per_pizza: number;
    hydration: number;
  };
};

export type RecipeParsed = {
  id: string;
  name: string;
  doughballWeight: number;
  ingredientRatios: {
    flour: number;
    water: number;
    salt: number;
    yeast: number;
    oil: number;
    sugar: number;
  };
};

export type AllRecipesFolder = Omit<
  RecipeFolder,
  "userId" | "createdAt" | "updatedAt"
>;
export type RecipeFolder = Folder & { recipes: Recipe[] };
