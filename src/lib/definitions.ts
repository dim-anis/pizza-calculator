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

export type AllRecipesFolder = Omit<
  RecipeFolder,
  "userId" | "createdAt" | "updatedAt"
>;
export type RecipeFolder = Folder & { recipes: Recipe[] };
