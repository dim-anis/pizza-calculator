import { DoughIngredientRatios, DoughIngredients } from "@/lib/definitions";

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

export function ingredientRatiosToQuantities(
  totalDoughWeight: number,
  ingredientRatios: DoughIngredientRatios,
) {
  const ingredientAmounts = {
    flourAmount: 0,
    waterAmount: 0,
    saltAmount: 0,
    yeastAmount: 0,
    sugarAmount: 0,
    oilAmount: 0,
  };
  const totalPercentage = Object.values(ingredientRatios).reduce(
    (total, ratio) => total + ratio,
    0,
  );

  for (const ingredient of Object.keys(ingredientRatios) as Array<
    keyof DoughIngredientRatios
  >) {
    const amount =
      (totalDoughWeight * ingredientRatios[ingredient]) / totalPercentage;
    ingredientAmounts[
      `${ingredient.replace(
        "Ratio",
        "Amount",
      )}` as keyof typeof ingredientAmounts
    ] = amount > 100 ? Math.round(amount) : Number(amount.toFixed(1));
  }

  return ingredientAmounts;
}

function calculateBakersPercentage(
  ingredientAmount: number,
  flourAmount: number,
) {
  return ingredientAmount / flourAmount;
}
export function ingredientQuantitiesToRatios({
  flourAmount,
  waterAmount,
  saltAmount,
  yeastAmount,
  sugarAmount,
  oilAmount,
}: DoughIngredients) {
  const ratios = {
    flourRatio: calculateBakersPercentage(flourAmount, flourAmount),
    waterRatio: calculateBakersPercentage(waterAmount, flourAmount),
    saltRatio: calculateBakersPercentage(saltAmount ?? 0, flourAmount),
    yeastRatio: calculateBakersPercentage(yeastAmount ?? 0, flourAmount),
    sugarRatio: calculateBakersPercentage(sugarAmount ?? 0, flourAmount),
    oilRatio: calculateBakersPercentage(oilAmount ?? 0, flourAmount),
  };

  return ratios;
}

export function getArrayFromOneTo(n: number) {
  return Array.from(Array(n).keys()).map((n) => n + 1);
}

export function getTotalDoughWeight(ingredients: DoughIngredients) {
  return Object.values(ingredients).reduce(
    (totalWeight, currItemWeight) => totalWeight + currItemWeight,
    0,
  );
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
