"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMemo, type ChangeEvent, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import pizzaStyles from "../../public/recipes.json";

export type PizzaStyleName = keyof typeof pizzaStyles;
export type RecipeType = (typeof pizzaStyles)[PizzaStyleName];

export function snakeCaseToSpaces(str: string) {
  return str.replaceAll("_", " ");
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

const MAX_VAL = 99999;

const errors = {
  negativeValue: "Value must be greater than 0.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`,
};

const CalculatorSettingsSchema = z.object({
  number_of_pizzas: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL),
    }),
  weight_per_pizza: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL),
    }),
  hydration: z.coerce
    .number()
    .gt(0, {
      message: errors.negativeValue,
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL),
    })
    .default(0),
});

const CalculatorSchema = z.object({
  name: z.coerce.string(),
  settings: CalculatorSettingsSchema,
});

export type CalculatorFormData = z.infer<typeof CalculatorSchema>;

type CalculatorProps = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => void;
  onSubmit: (values: CalculatorFormData) => void;
  defaultValues: CalculatorFormData;
};

export default function Calculator(props: CalculatorProps) {
  const { defaultValues, onSubmit, onSelectChange, onInputChange } = props;
  const settings = Object.keys(defaultValues.settings) as Array<
    keyof typeof defaultValues.settings
  >;

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(CalculatorSchema),
    defaultValues: useMemo(() => {
      return defaultValues;
    }, [defaultValues]),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  return (
    <Tabs defaultValue="default">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="default">Default</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      <TabsContent value="default">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      onValueChange={(value) => {
                        field.onChange(onSelectChange(value));
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pizza style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pizzaStyles.map((style) => {
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
                          placeholder={`Select ${snakeCaseToSpaces(
                            settingString,
                          )}`}
                          {...field}
                          onChange={(e) => field.onChange(onInputChange(e))}
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
      </TabsContent>
      <TabsContent value="custom">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      onValueChange={(value) => {
                        field.onChange(onSelectChange(value));
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pizza style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pizzaStyles.map((style) => {
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
                          placeholder={`Select ${snakeCaseToSpaces(
                            settingString,
                          )}`}
                          {...field}
                          onChange={(e) => field.onChange(onInputChange(e))}
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
      </TabsContent>
    </Tabs>
  );
}
