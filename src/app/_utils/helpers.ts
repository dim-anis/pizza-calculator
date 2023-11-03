import { PizzaRecipe } from "@/lib/definitions";
import { RecipeType } from "../page";

export function getRecipeIngredients(
  totalDoughWeight: number,
  recipeForPizzaStyle: PizzaRecipe["ingredients"],
) {
  const ingredientAmounts: Record<string, number> = {};

  const totalPercentage = Object.values(recipeForPizzaStyle).reduce(
    (total, percentage) => total + percentage,
    0,
  );

  for (const ingredient in recipeForPizzaStyle) {
    const amount =
      (totalDoughWeight * recipeForPizzaStyle[ingredient as keyof RecipeType]) /
      totalPercentage;
    ingredientAmounts[ingredient] =
      amount > 100 ? Math.round(amount) : Number(amount.toFixed(1));
  }

  return ingredientAmounts;
}

export function snakeCaseToSpaces(str: string) {
  return str.replaceAll("_", " ");
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
