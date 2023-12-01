import { Recipe } from "@prisma/client";
import { CreateRecipeData } from "@/app/(myrecipes)/myrecipes/[folder]/new-recipe/definitions";

export type DoughIngredients = Pick<
  CreateRecipeData,
  | "flourAmount"
  | "waterAmount"
  | "saltAmount"
  | "yeastAmount"
  | "sugarAmount"
  | "oilAmount"
>;

export type DoughIngredientRatios = Pick<
  Recipe,
  | "flourRatio"
  | "waterRatio"
  | "saltRatio"
  | "yeastRatio"
  | "sugarRatio"
  | "oilRatio"
>;
