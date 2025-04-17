import { ZodIssue } from "zod";
import { BakersFormulaForm, RecipeForm, RecipeWithIngredients } from "./types";

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
  ingredients: BakersFormulaForm["ingredients"],
) {
  const totalPercentage = Object.values(ingredients)
    .flat()
    .reduce((total, { percentage }) => total + percentage, 0);

  return {
    flours: ingredients.flours.map((i) => ({
      ...i,
      weightInGrams: (totalDoughWeight * i.percentage) / totalPercentage,
    })),
    liquids: ingredients.liquids.map((i) => ({
      ...i,
      weightInGrams: (totalDoughWeight * i.percentage) / totalPercentage,
    })),
    others: ingredients.others.map((i) => ({
      ...i,
      weightInGrams: (totalDoughWeight * i.percentage) / totalPercentage,
    })),
  };
}

function calculateBakersPercentage(
  ingredientWeight: number,
  flourWeight: number,
) {
  return Math.round((ingredientWeight / flourWeight) * 100 * 10) / 10;
}

export function calculateIngredientRatios(
  ingredients: RecipeForm["ingredients"],
  totalFlourWeight: number,
) {
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

export function roundWeightTo(weight: number, decimalPlaces = 1) {
  const factor = 10 ** decimalPlaces;
  return Number.isInteger(weight)
    ? weight
    : Math.round(weight * factor) / factor;
}
