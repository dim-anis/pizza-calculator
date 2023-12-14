import { validationErrorMessages } from "@/lib/helpers";
import { z } from "zod";

const MAX_INPUT_VALUE = 99999;
export const CreateRecipeSchema = z.object({
  name: z.coerce.string().min(1, { message: "Recipe name is required." }),
  numOfDoughballs: z.coerce
    .number()
    .min(1, { message: "Number of doughballs is required." })
    .max(16, { message: "Select a value between 1 and 16" }),
  flourAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : "")),
  waterAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : "")),
  saltAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : ""))
    .optional()
    .or(z.literal("")),
  yeastAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : ""))
    .optional()
    .or(z.literal("")),
  sugarAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : ""))
    .optional()
    .or(z.literal("")),
  oilAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .nullish()
    .transform((x) => (x ? x : ""))
    .optional()
    .or(z.literal("")),
  selectedOptionalIngredients: z.array(z.string()),
  selectedFolders: z.array(z.string()),
  notes: z.string().max(500).optional(),
});

export type CreateRecipeData = z.infer<typeof CreateRecipeSchema>;
