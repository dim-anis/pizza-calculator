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
    "flour": 100,
    "water": 60,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  },
  "neapolitan_home_oven": {
    "flour": 100,
    "water": 68,
    "salt": 2.5,
    "yeast": 0.4,
    "oil": 1.5
  },
  "new_york": {
    "flour": 100,
    "water": 63,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  },
  "chicago": {
    "flour": 100,
    "water": 53,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  },
  "detroit": {
    "flour": 100,
    "water": 62,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  },
  "al_taglio": {
    "flour": 100,
    "water": 73,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  },
  "calzone": {
    "flour": 100,
    "water": 63,
    "salt": 2.5,
    "yeast": 0.3,
    "oil": 1.5
  }
}

export type PizzaStyles = typeof pizzaStyles;
export type PizzaStyleName = keyof PizzaStyles;
export type RecipeType<T extends PizzaStyleName> = PizzaStyles[T];

export function capitalizeEveryFirstChar(expression: string) {
  return expression.split("_").map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1)).join(" ");
}

const MAX_VAL = 99999;

const errors = {
  negativeValue: "Value must be positive.",
  valueExceeds: (val: number) => `Value must be less than ${val}.`
}

const CalculatorSettingsSchema = z.object({
  numberOfPizzas: z
    .coerce
    .number()
    .gt(0, {
      message: errors.negativeValue
    })
    .lt(MAX_VAL, {
      message: errors.valueExceeds(MAX_VAL)
    })
  ,
  weightPerPizza: z
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
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col gap-5">
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
                        {capitalizeEveryFirstChar(pizzaStyle)}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {settings.map((setting) => (
          <FormField
            key={setting}
            control={form.control}
            name={`settings.${setting}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{capitalizeEveryFirstChar(setting)}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder={`Select ${setting}`}
                    {...field}
                    onChange={(e) => field.onChange(props.onInputChange(e))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  )
}
