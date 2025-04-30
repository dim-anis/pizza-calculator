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
import {
  DefaultValues,
  FieldPath,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { type IngredientForm, ingredientFormSchema } from "@/lib/types";
import { useState, useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { Alert } from "@/components/alert-destructive";
import { IngredientType, Prisma } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOrUpdateIngredient } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { getIngredients } from "@/lib/queries";

type Props = {
  ingredientTypes: IngredientType[];
  userIngredients: Prisma.PromiseReturnType<typeof getIngredients>;
  defaultValues?: DefaultValues<IngredientForm>;
};

export default function IngredientForm({
  ingredientTypes,
  defaultValues,
  userIngredients,
}: Props) {
  const [selectIngredientsDialogOpen, setSelectIngredientsDialogOpen] =
    useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<IngredientForm>({
    mode: "onChange",
    resolver: zodResolver(ingredientFormSchema),
    ...(defaultValues ? { defaultValues } : {}),
  });

  const ingredientType = form.watch("type");
  const {
    fields: ingredientComponents,
    remove: removeIngredientComponent,
    append: appendIngredientComponent,
  } = useFieldArray({
    control: form.control,
    name: "components",
  });

  function handleSelectIngredients(
    userIngredient: Prisma.PromiseReturnType<typeof getIngredients>[number],
  ) {
    const selectedIngredientIndex = ingredientComponents.findIndex(
      (selectedInredient) =>
        selectedInredient.ingredient.name === userIngredient.name,
    );

    if (selectedIngredientIndex !== -1) {
      const flours = ingredientComponents.filter(
        ({
          ingredient: {
            type: { type: ingredientType },
          },
        }) => ingredientType === "Flour",
      );

      if (
        ingredientComponents[selectedIngredientIndex].ingredient.type.type ===
          "Flour" &&
        flours.length < 2
      ) {
        return;
      }

      removeIngredientComponent(selectedIngredientIndex);
      return;
    }

    appendIngredientComponent({
      ...userIngredient,
      ingredient: userIngredient,
      ingredientId: userIngredient.id,
      parentId: userIngredient.id,
      weightInGrams: 0,
    });
  }

  async function onSubmit(formData: IngredientForm) {
    startTransition(async () => {
      const result = await createOrUpdateIngredient(formData);

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
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
      >
        <FormField
          control={form.control}
          name="type"
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
                  {ingredientTypes.map((ingredient) => {
                    return (
                      <SelectItem key={ingredient.id} value={ingredient.type}>
                        {ingredient.type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {ingredientType === "Preferment" && (
          <fieldset className="rounded-xl border">
            <legend className="px-1 py-1 ml-1">
              <FormLabel>Preferment recipe</FormLabel>
            </legend>
            <div className="space-y-4 p-4">
              {ingredientComponents.map((ingredient, index) => (
                <FormField
                  key={ingredient.id}
                  control={form.control}
                  name={`components.${index}.weightInGrams`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ingredient.ingredient.name}</FormLabel>
                      <div className="flex space-x-2 justify-center items-center">
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder={`Enter the amount of ${ingredient.ingredient.name.toLowerCase()}`}
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <Button
                          size={"icon"}
                          variant={"secondary"}
                          type="button"
                          onClick={() => removeIngredientComponent(index)}
                        >
                          <Icons.delete />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setSelectIngredientsDialogOpen(true)}
              >
                <Icons.add className="mr-2 h-4 w-4" />
                Add ingredient
              </Button>
            </div>
          </fieldset>
        )}

        <Dialog
          open={selectIngredientsDialogOpen}
          onOpenChange={setSelectIngredientsDialogOpen}
        >
          <DialogContent className="gap-0 p-0 outline-none">
            <DialogHeader className="px-4 pb-4 pt-5">
              <DialogTitle>Select ingredients</DialogTitle>
              <DialogDescription>
                Select ingredients for your recipe.
              </DialogDescription>
            </DialogHeader>
            <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
              <CommandInput placeholder="Search ingredients..." />
              <CommandList>
                <CommandEmpty>No ingredients found.</CommandEmpty>
                <CommandGroup className="p-2">
                  {userIngredients.map((userIngredient) => (
                    <CommandItem
                      key={userIngredient.id}
                      className="flex items-center px-2"
                      onSelect={() => handleSelectIngredients(userIngredient)}
                    >
                      <div className="ml-2">
                        <p className="text-sm font-medium leading-none">
                          {userIngredient.name}
                        </p>
                      </div>
                      {ingredientComponents.find(
                        ({ ingredient }) =>
                          ingredient.name === userIngredient.name,
                      ) ? (
                        <Check className="ml-auto flex h-5 w-5 text-primary" />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
              <Button
                type="button"
                disabled={ingredientComponents.length < 1}
                onClick={() => {
                  setSelectIngredientsDialogOpen(false);
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <SubmitButton type="submit" pending={pending}>
          {`${defaultValues ? "Update" : "Create"} ingredient`}
        </SubmitButton>
      </form>
    </Form>
  );
}
