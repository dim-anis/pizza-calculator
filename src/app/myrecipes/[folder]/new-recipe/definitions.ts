import { validationErrorMessages } from "@/app/_utils/helpers";
import { z } from "zod";

const MAX_INPUT_VALUE = 99999;
export const CreateRecipeSchema = z.object({
  name: z.coerce.string().min(1, { message: "Recipe name is required." }),
  numOfDoughballs: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
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
  selectedOptionalIngredients: z.array(z.string()),
  selectedFolders: z.array(z.string()),
  notes: z.string().max(500).optional(),
});

export type CreateRecipeData = z.infer<typeof CreateRecipeSchema>;
