import { ZodIssue } from "zod";
import { RecipeForm, RecipeWithIngredients } from "./types";

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const validationErrorMessages = {
  negativeValue: "Value must be greater than 0.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`,
};

export function calculateIngredientWeights(
  totalDoughWeight: number,
  ingredients: RecipeWithIngredients["ingredients"][number][],
) {
  const totalPercentage = ingredients.reduce(
    (total, { percentage }) => total + percentage,
    0,
  );

  return ingredients
    .map((ingredient) => ({
      ...ingredient,
      weightInGrams:
        (totalDoughWeight * ingredient.percentage) / totalPercentage,
    }))
    .sort((a, b) => b.weightInGrams - a.weightInGrams);
}

function calculateBakersPercentage(
  ingredientWeight: number,
  flourWeight: number,
) {
  return Math.round((ingredientWeight / flourWeight) * 100 * 10) / 10;
}

export function calculateIngredientRatios(
  ingredients: RecipeForm["ingredients"],
) {
  const totalFlourWeight = ingredients.reduce(
    (total, { ingredient, weightInGrams }) =>
      total + (ingredient.isFlour ? weightInGrams : 0),
    0,
  );
  return ingredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculateBakersPercentage(
      ingredient.weightInGrams,
      totalFlourWeight,
    ),
  }));
}

export function getArrayFromOneTo(n: number) {
  return Array.from(Array(n).keys()).map((n) => n + 1);
}

export function getTotalDoughWeight(
  ingredients: RecipeWithIngredients["ingredients"][number][],
) {
  return ingredients.reduce((total, item) => total + item.weightInGrams, 0);
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export function parseZodIssues(issues: ZodIssue[]) {
  const parsedIssues: Record<string, string[]> = {};
  issues.forEach((i) => {
    const key = i.path.join(".");
    if (!parsedIssues[key]) {
      parsedIssues[key] = [];
    }
    parsedIssues[key].push(i.message);
  });
  return parsedIssues;
}
