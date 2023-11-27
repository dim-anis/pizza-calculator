import { validationErrorMessages } from "@/app/_utils/helpers";
import { z } from "zod";

const MAX_INPUT_VALUE = 99999;

const IngredientSchema = z.object({
  flourAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  waterAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
});

const OptionalIngredientSchema = z.object({
  saltAmount: z.coerce
    .number()
    .gte(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .optional(),
  yeastAmount: z.coerce
    .number()
    .gte(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .optional(),
  sugarAmount: z.coerce
    .number()
    .gte(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .optional(),
  oilAmount: z.coerce
    .number()
    .gte(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .optional(),
});

export const CreateRecipeSchema = z.object({
  recipeName: z.coerce.string().min(1, { message: "Recipe name is required." }),
  numOfDoughballs: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  ingredients: IngredientSchema,
  optionalIngredients: OptionalIngredientSchema,
  selectedOptionalIngredients: z.array(z.string()),
});

export type CreateRecipeData = z.infer<typeof CreateRecipeSchema>;
