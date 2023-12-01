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
import { capitalize, snakeCaseToSpaces } from "./_utils/helpers";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const errors = {
  negativeValue: "Value must be greater than 0.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`,
};

const MAX_INPUT_VALUE = 99999;

const CalculatorSettingsSchema = z.object({
  number_of_pizzas: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: errors.valueExceeds(MAX_INPUT_VALUE),
    }),
  weight_per_pizza: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: errors.valueExceeds(MAX_INPUT_VALUE),
    }),
  hydration: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: errors.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0),
});

const CalculatorSchema = z.object({
  name: z.coerce.string(),
  settings: CalculatorSettingsSchema,
});

export type CalculatorFormData = z.infer<typeof CalculatorSchema>;

type CalculatorFormProps = {
  defaultValues: CalculatorFormData;
  handleSubmit: (data: CalculatorFormData) => void;
};

export default function CustomRecipeForm({
  defaultValues,
  handleSubmit,
}: CalculatorFormProps) {
  const form = useForm<CalculatorFormData>({
    mode: "onChange",
    resolver: zodResolver(CalculatorSchema),
    // defaultValues,
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
                <FormLabel>Pizza name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={"Name your pizza"}
                    {...field}
                  />
                </FormControl>
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
