"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldPath, useForm } from "react-hook-form";
import { type IngredientForm, ingredientFormSchema } from "@/lib/types";
import { useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { Alert } from "@/components/alert-destructive";
import { IngredientType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOrUpdateIngredient } from "@/lib/actions";

type Props = {
  ingredientTypes: IngredientType[];
  defaultValues?: DefaultValues<IngredientForm>;
};

export default function IngredientForm({
  ingredientTypes,
  defaultValues,
}: Props) {
  const [pending, startTransition] = useTransition();

  const form = useForm<IngredientForm>({
    mode: "onChange",
    resolver: zodResolver(ingredientFormSchema),
    ...(defaultValues ? { defaultValues } : {}),
  });

  async function onSubmit(formData: IngredientForm) {
    startTransition(async () => {
      const result = await createOrUpdateIngredient(
        formData,
        defaultValues ? defaultValues.name : undefined,
      );

      if (result.errors) {
        Object.entries(result.errors).forEach(([path, message]) => {
          form.setError(path as FieldPath<IngredientForm>, {
            message: message.join("\n"),
          });
        });
      }
    });
  }

  return (
    <Form {...form}>
      {form.formState.errors.root?.message && (
        <Alert
          title={"Error"}
          variant={"destructive"}
          description={form.formState.errors.root?.message}
        />
      )}
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your ingredient name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? String(field.value) : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ingredient type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ingredientTypes.map(({ id, type }) => {
                    return (
                      <SelectItem key={id} value={id.toString()}>
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton type="submit" pending={pending}>
          {`${defaultValues ? "Update" : "Create"} ingredient`}
        </SubmitButton>
      </form>
    </Form>
  );
}
