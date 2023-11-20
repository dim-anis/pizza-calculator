import { RecipeParsed } from "@/lib/definitions";

export const validationErrorMessages = {
  negativeValue: "Value must be greater than 0.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`,
};

export function getRecipeIngredientQuantities(
  totalDoughWeight: number,
  ingredientRatios: RecipeParsed["ingredientRatios"],
) {
  const ingredientAmounts = {
    flour: 0,
    water: 0,
    salt: 0,
    yeast: 0,
    sugar: 0,
    oil: 0,
  };
  const totalPercentage = Object.values(ingredientRatios).reduce(
    (total, ratio) => total + ratio,
    0,
  );

  for (const ingredient of Object.keys(ingredientRatios) as Array<
    keyof RecipeParsed["ingredientRatios"]
  >) {
    const amount =
      (totalDoughWeight * ingredientRatios[ingredient]) / totalPercentage;
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

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
