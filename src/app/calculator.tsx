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
  neapolitan: {
    flour: 1000,
    water: 850,
    salt: 10
  },
  new_york: {
    flour: 1000,
    water: 700,
    salt: 10,
    oil: 10
  },
  detroit: {
    flour: 1000,
    water: 650,
    salt: 15
  }
}

function capitalizeEveryFirstChar(expression: string) {
  return expression.split("_").map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1)).join(" ");
}

const MAX_VAL = 99999;

const IngredientSchema = z.object({
  flour: z
    .coerce
    .number()
    .gt(0, {
      message: "Can't make pizza with no flour!"
    })
    .lt(MAX_VAL, {
      message: "Come on, this much flour?"
    })
  ,
  water: z
    .coerce
    .number()
    .gt(0, {
      message: "Can't make pizza with no water!"
    })
    .lt(MAX_VAL, {
      message: "Come on, this much water?"
    })
  ,
  salt: z
    .coerce
    .number()
    .lt(MAX_VAL, {
      message: "Come on, this much salt?"
    })
    .default(0),
  oil: z
    .coerce
    .number()
    .lt(MAX_VAL, {
      message: "Come on, this much oil?"
  })
    .optional(),

  sugar: z
    .coerce
    .number()
    .lt(MAX_VAL, {
      message: "Come on, this much sugar?"
  })
    .optional(),
})

const RecipeSchema = z.object({
  pizzaStyle: z
    .coerce
    .string(),
  ingredients: IngredientSchema
})

export type CalculatorFormData = z.infer<typeof RecipeSchema>;

type CalculatorProps = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSelectChange: (value: keyof typeof pizzaStyles) => void,
  onSubmit: (values: CalculatorFormData) => void,
  defaultValues: CalculatorFormData,
}

export default function Calculator(props: CalculatorProps) {
  const ingredients = Object.keys(props.defaultValues.ingredients) as Array<keyof typeof props.defaultValues.ingredients>;

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(RecipeSchema),
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
        {ingredients.map((ingredient) => (
          <FormField
            key={ingredient}
            control={form.control}
            name={`ingredients.${ingredient}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{capitalizeEveryFirstChar(ingredient)}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    pattern="[0-9]+"
                    inputMode="numeric"
                    placeholder={`Enter the amount of ${ingredient}`}
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
