import { ZodIssue } from "zod";
import { BakersFormulaForm, Recipe, Ingredient } from "./types";

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
  return (ingredientWeight / flourWeight) * 100;
}

export function calculateIngredientRatios(
  ingredients: Ingredient[],
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
  ingredients: Recipe["ingredients"][number][],
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

export function roundNumTo(num: number, decimalPlaces = 1) {
  const factor = 10 ** decimalPlaces;
  return Number.isInteger(num) ? num : Math.round(num * factor) / factor;
}

// function flattenRecipeIngredients(recipe: Recipe): FlattenedIngredient[] {
//   const flat: FlattenedIngredient[] = [];
//
//   for (const i of recipe.ingredients) {
//     const ing = i.ingredient;
//
//     if (ing.components.length === 0) {
//       flat.push({
//         id: ing.id,
//         name: ing.name,
//         weightInGrams: i.weightInGrams,
//         type: ing.type.type,
//         source: "main",
//       });
//     } else {
//       const totalComponentWeight = ing.components.reduce(
//         (sum, c) => sum + c.weightInGrams,
//         0,
//       );
//
//       for (const c of ing.components) {
//         flat.push({
//           id: c.ingredient.id,
//           name: c.ingredient.name,
//           weightInGrams:
//             (c.weightInGrams / totalComponentWeight) * i.weightInGrams,
//           type: c.ingredient.type.type,
//           source: "preferment",
//           prefermentName: ing.name, // distinguish between Poolish, Biga, etc.
//         });
//       }
//     }
//   }
//
//   return flat;
// }
