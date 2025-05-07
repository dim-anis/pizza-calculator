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

export function scaleIngredients(recipeIngredients: Recipe["ingredients"]) {
  for (const ingredient of recipeIngredients) {
    const { ingredient: ing, weightInGrams } = ingredient;

    for (const component of ing.components) {
      const proportion =
        component.weightInGrams /
        ing.components.reduce((sum, c) => sum + c.weightInGrams, 0);
      const scaledWeight = proportion * weightInGrams;
      component.weightInGrams = scaledWeight;
    }
  }

  return recipeIngredients;
}

export function flattenIngredients(recipeIngredients: Recipe["ingredients"]) {
  const result = new Map<
    string,
    { total: number; type: string; sources: Map<string, number> }
  >();

  function addContribution(
    name: string,
    type: string,
    amount: number,
    source: string,
  ) {
    if (!result.has(name)) {
      result.set(name, { total: 0, type, sources: new Map() });
    }

    const entry = result.get(name)!;
    entry.total += amount;
    entry.sources.set(source, (entry.sources.get(source) || 0) + amount);
  }

  function process(
    ingredientItem: Recipe["ingredients"][number],
    sourceName = "Final Dough Mix",
  ) {
    const { weightInGrams, ingredient } = ingredientItem;

    addContribution(
      ingredient.name,
      ingredient.type.type,
      weightInGrams,
      sourceName,
    );

    if (ingredient.components?.length) {
      const totalComponentWeight = ingredient.components.reduce(
        (sum, comp) => sum + comp.weightInGrams,
        0,
      );

      ingredient.components.forEach((component) => {
        const scaledAmount =
          (weightInGrams * component.weightInGrams) / totalComponentWeight;

        process(
          {
            weightInGrams: scaledAmount,
            ingredient: { ...component.ingredient, components: [] },
          },
          ingredient.name,
        );
      });
    }
  }

  recipeIngredients.forEach((item) => process(item));

  return Array.from(result.entries()).map(
    ([ingredient, { total, type, sources }]) => ({
      ingredient,
      total,
      type,
      sources: Array.from(sources.entries()).map(([source, quantity]) => ({
        source,
        quantity,
      })),
    }),
  );
}

function calculatePrefermentRatio(
  totalFlourWeight: number,
  flourIngredients: ReturnType<typeof flattenIngredients>,
  prefermentIngredient: ReturnType<typeof flattenIngredients>[number],
) {
  return (
    (flourIngredients.reduce(
      (total, currFlourIngredient) =>
        (total += currFlourIngredient.sources.reduce(
          (totalQty, curr) =>
            (totalQty +=
              curr.source === prefermentIngredient.ingredient
                ? curr.quantity
                : 0),
          0,
        )),
      0,
    ) /
      totalFlourWeight) *
    100
  );
}

export function calculateIngredientRatiosNew(
  flattenedIngredients: ReturnType<typeof flattenIngredients>,
) {
  const flourIngredients = flattenedIngredients.filter(
    (item) => item.type === "Flour",
  );
  const totalFlourWeight = flourIngredients.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  return flattenedIngredients.map((item) => ({
    ...item,
    percentage:
      item.type === "Preferment"
        ? calculatePrefermentRatio(totalFlourWeight, flourIngredients, item)
        : calculateBakersPercentage(item.total, totalFlourWeight),
  }));
}

export function scaleIngredientsByFactor(
  flattenedIngredients: ReturnType<typeof calculateIngredientRatiosNew>,
  scalingFactor: number,
) {
  return flattenedIngredients.map((item) => {
    const scaledTotal = item.total * scalingFactor;

    const scaledSources = item.sources.map((source) => ({
      source: source.source,
      quantity: source.quantity * scalingFactor,
    }));

    return {
      ...item,
      total: scaledTotal,
      sources: scaledSources,
    };
  });
}
