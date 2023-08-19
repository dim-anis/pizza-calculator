"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMemo, type ChangeEvent, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const pizzaStyles = {
  "neapolitan_brick_oven": {
    "flour": 1,
    "water": 0.6,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  },
  "neapolitan_home_oven": {
    "flour": 1,
    "water": 0.68,
    "salt": 0.025,
    "yeast": 0.004,
    "oil": 0.015
  },
  "new_york": {
    "flour": 1,
    "water": 0.63,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  },
  "chicago": {
    "flour": 1,
    "water": 0.53,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  },
  "detroit": {
    "flour": 1,
    "water": 0.62,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  },
  "al_taglio": {
    "flour": 1,
    "water": 0.73,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  },
  "calzone": {
    "flour": 1,
    "water": 0.63,
    "salt": 0.025,
    "yeast": 0.003,
    "oil": 0.015
  }
}

export type PizzaStyleName = keyof typeof pizzaStyles;
export type RecipeType = typeof pizzaStyles[PizzaStyleName];

export function snakeCaseToRegular(str: string) {
  return str.replaceAll("_", " ");
}

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

const MAX_VAL = 99999;

const errors = {
  negativeValue: "Value must be greater than 0.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`
}

const CalculatorSettingsSchema = z.object({
  number_of_pizzas: z
    .coerce
    .number()
    .gt(0, {
      message: errors.negativeValue
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL)
    })
  ,
  weight_per_pizza: z
    .coerce
    .number()
    .gt(0, {
      message: errors.negativeValue
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL)
    })
  ,
  hydration: z
    .coerce
    .number()
    .gt(0, {
      message: errors.negativeValue
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL)
    })
    .default(0),
})

const CalculatorSchema = z.object({
  pizzaStyle: z
    .coerce
    .string(),
  settings: CalculatorSettingsSchema
})

export type CalculatorFormData = z.infer<typeof CalculatorSchema>;

type CalculatorProps = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSelectChange: (value: PizzaStyleName) => void,
  onSubmit: (values: CalculatorFormData) => void,
  defaultValues: CalculatorFormData,
}

export default function Calculator(props: CalculatorProps) {
  const settings = Object.keys(props.defaultValues.settings) as Array<keyof typeof props.defaultValues.settings>;

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(CalculatorSchema),
    defaultValues: useMemo(() => {
      return props.defaultValues;
    }, [props])
  })

  useEffect(() => {
    form.reset(props.defaultValues);
  }, [form, props.defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col justify-around gap-5">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="pizzaStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pizza style</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(props.onSelectChange(value as keyof typeof pizzaStyles))
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pizza style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      Object.keys(pizzaStyles).map((pizzaStyle, index) => (
                        <SelectItem key={index} value={pizzaStyle}>
                          {
                            snakeCaseToRegular(pizzaStyle)
                              .split(" ")
                              .map((word) => capitalize(word))
                              .join(" ")
                          }
                        </SelectItem>
                      ))
                    }
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
                    {
                      snakeCaseToRegular(settingString)
                        .split(" ")
                        .map((word, index) => index === 0 ? capitalize(word) : word)
                        .join(" ")
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder={`Select ${snakeCaseToRegular(settingString)}`}
                      {...field}
                      onChange={(e) => field.onChange(props.onInputChange(e))} />
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
  )
}
