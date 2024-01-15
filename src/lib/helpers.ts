import {
  ActionState,
  DoughIngredientRatios,
  DoughIngredients,
} from "@/lib/definitions";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { nutritionalContent } from "../../public/nutriContent";

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
    flourRatio: calculateBakersPercentage(
      Number(flourAmount),
      Number(flourAmount),
    ),
    waterRatio: calculateBakersPercentage(
      Number(waterAmount),
      Number(flourAmount),
    ),
    saltRatio: calculateBakersPercentage(
      Number(saltAmount),
      Number(flourAmount),
    ),
    yeastRatio: calculateBakersPercentage(
      Number(yeastAmount),
      Number(flourAmount),
    ),
    sugarRatio: calculateBakersPercentage(
      Number(sugarAmount),
      Number(flourAmount),
    ),
    oilRatio: calculateBakersPercentage(Number(oilAmount), Number(flourAmount)),
  };

  return ratios;
}

export function getArrayFromOneTo(n: number) {
  return Array.from(Array(n).keys()).map((n) => n + 1);
}

export function getTotalDoughWeight(ingredients: DoughIngredients) {
  const totalWeight = Object.values(ingredients).reduce(
    (totalWeight, currItemWeight) =>
      Number(totalWeight) + Number(currItemWeight),
    0,
  );

  return Number(totalWeight);
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export function catchError(e: unknown): ActionState {
  if (e instanceof ZodError) {
    return {
      status: "error",
      message: "invalid form data",
      errors: e.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if ((e.code = "P2022")) {
      return {
        status: "error",
        message: "invalid form data",
        errors: [
          {
            path: "name",
            message:
              "An item with this name already exists. Please choose a different name.",
          },
        ],
      };
    }
  }
  return {
    status: "error",
    message: `Something went wrong. Please try again.`,
  };
}

export function calculateNutritionalContent({
  flourAmount,
  oilAmount,
  sugarAmount,
}: Record<keyof DoughIngredients, number>) {
  const normalizationFactor = 0.01;
  const normalize = (amount: number) => amount * normalizationFactor;

  const { flourNormalized, oilNormalized, sugarNormalized } = {
    flourNormalized: normalize(flourAmount),
    oilNormalized: normalize(oilAmount),
    sugarNormalized: normalize(sugarAmount),
  };

  const calories = Math.round(
    flourNormalized * nutritionalContent.flour.calories +
      oilNormalized * nutritionalContent.oil.calories +
      sugarNormalized * nutritionalContent.sugar.calories,
  );

  const protein = Number(
    (
      flourNormalized * nutritionalContent.flour.protein +
      oilNormalized * nutritionalContent.oil.protein +
      sugarNormalized * nutritionalContent.sugar.protein
    ).toPrecision(2),
  );

  const fat = Number(
    (
      flourNormalized * nutritionalContent.flour.fat +
      oilNormalized * nutritionalContent.oil.fat +
      sugarNormalized * nutritionalContent.sugar.fat
    ).toPrecision(2),
  );

  const carbs = Number(
    (
      flourNormalized * nutritionalContent.flour.carbs +
      oilNormalized * nutritionalContent.oil.carbs +
      sugarNormalized * nutritionalContent.sugar.carbs
    ).toPrecision(2),
  );

  return { calories, protein, fat, carbs };
}
