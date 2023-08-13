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
import { ChangeEvent } from "react"

const MAX_FLOUR_IN_GR = 99999; 
const MAX_WATER_IN_ML = 99999;
const MAX_SALT_IN_GR = 99999; 

const CalculatorFormSchema = z.object({
  flour: z
    .coerce
    .number()
    .gt(0, {
      message: "Can't make pizza with no flour!"
    })
    .lt(MAX_FLOUR_IN_GR, {
      message: "Come on, this much flour?"
    })
  ,
  water: z
    .coerce
    .number()
    .gt(0, {
      message: "Can't make pizza with no water!"
    })
    .lt(MAX_WATER_IN_ML, {
      message: "Come on, this much flour?"
    })
  ,
  salt: z
    .coerce
    .number()
    .lt(MAX_SALT_IN_GR, {
      message: "Come on, this much salt?"
    })
    .default(0)
  ,
})

export type CalculatorFormData = z.infer<typeof CalculatorFormSchema>;

type CalculatorProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (values: CalculatorFormData) => void,
  values: CalculatorFormData,
}

export default function Calculator(props: CalculatorProps) {
  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(CalculatorFormSchema),
    defaultValues: props.values
  })


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="flour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flour</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  placeholder="Enter the amount of flour"
                  {...field}
                  onChange={(e) => field.onChange(props.onChange(e))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="water"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Choose hydration"
                  {...field}
                  onChange={(e) => field.onChange(props.onChange(e))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salt</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter the amount of salt"
                  {...field}
                  onChange={(e) => field.onChange(props.onChange(e))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
