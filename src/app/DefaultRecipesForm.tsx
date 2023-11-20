import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  capitalize,
  snakeCaseToSpaces,
  validationErrorMessages,
} from "./_utils/helpers";
import { z } from "zod";
import { RecipeParsed } from "@/lib/definitions";
import { UseFormReset, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_INPUT_VALUE = 99999;

const CalculatorSettingsSchema = z.object({
  number_of_pizzas: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  weight_per_pizza: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  hydration: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0),
});

const CalculatorSchema = z.object({
  name: z.coerce.string(),
  settings: CalculatorSettingsSchema,
});

export type CalculatorFormData = z.infer<typeof CalculatorSchema>;

type CalculatorFormProps = {
  pizzaRecipes: RecipeParsed[];
  defaultValues: CalculatorFormData;
  handleSubmit: (data: CalculatorFormData) => void;
  handleSelectChange: (
    name: string,
    setValue: UseFormReset<CalculatorFormData>,
  ) => void;
};

export default function DefaultRecipesForm({
  pizzaRecipes,
  defaultValues,
  handleSubmit,
  handleSelectChange,
}: CalculatorFormProps) {
  const form = useForm<CalculatorFormData>({
    mode: "onChange",
    resolver: zodResolver(CalculatorSchema),
    defaultValues,
  });

  const settings = Object.keys(defaultValues.settings) as Array<
    keyof typeof defaultValues.settings
  >;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around gap-5 bg-white"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pizza style</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(handleSelectChange(value, form.reset))
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pizza style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pizzaRecipes.map((style) => {
                      return (
                        <SelectItem key={style.id} value={style.name}>
                          {style.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {settings.map((settingString) => (
            <FormField
              key={settingString}
              control={form.control}
              name={`settings.${settingString}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {snakeCaseToSpaces(settingString)
                      .split(" ")
                      .map((word, index) =>
                        index === 0 ? capitalize(word) : word,
                      )
                      .join(" ")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder={`Select ${snakeCaseToSpaces(settingString)}`}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/[^0-9]/, ""))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  );
}
