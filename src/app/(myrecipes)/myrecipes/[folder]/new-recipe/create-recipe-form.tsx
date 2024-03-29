"use client";

import { getArrayFromOneTo } from "@/lib/helpers";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRecipe } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FieldPath, useForm } from "react-hook-form";
import { CreateRecipeData, CreateRecipeSchema } from "./definitions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ingredients, optionalIngredients } from "../../../../../lib/data";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import SubmitButton from "@/components/submit-button";
import { AlertDestructive } from "@/components/alert-destructive";
import { ActionState } from "@/lib/definitions";

type Params = {
  folder: string;
  id: string;
};

export default function CreateRecipeForm({
  folders,
}: {
  folders: { id: string; name: string }[];
}) {
  const [uncaughtError, setUncaughtError] = useState<ActionState>();
  const [pending, startTransition] = useTransition();
  const params: Params = useParams();
  const folderName = decodeURIComponent(params["folder"]);
  const form = useForm<CreateRecipeData>({
    mode: "onChange",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      name: "",
      numOfDoughballs: 0,
      flourAmount: "",
      waterAmount: "",
      saltAmount: "",
      yeastAmount: "",
      oilAmount: "",
      sugarAmount: "",
      selectedOptionalIngredients: ["saltAmount", "yeastAmount"],
      selectedFolders: [],
    },
  });

  const selectedOptions = form.watch("selectedOptionalIngredients");

  async function handleSubmit(formData: CreateRecipeData) {
    startTransition(async () => {
      const result = await createRecipe(formData);

      if (result?.status === "error") {
        if (
          result.message === "invalid form data" ||
          result.message === "duplicate key"
        ) {
          result.errors?.forEach((error) => {
            form.setError(error.path as FieldPath<CreateRecipeData>, {
              message: error.message,
            });
          });
        } else {
          setUncaughtError(result);
        }
      }
    });
  }

  return (
    <Form {...form}>
      {uncaughtError && (
        <AlertDestructive description={uncaughtError.message} />
      )}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around space-y-6 bg-white"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your recipe name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {folders.length > 1 && (
          <FormField
            control={form.control}
            name="selectedFolders"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select folders</FormLabel>
                  <FormDescription>
                    Select folders to assign this recipe to.
                  </FormDescription>
                </div>
                {folders
                  .filter((folder) => folder.name !== "All")
                  .map((folder) => (
                    <FormField
                      key={folder.id}
                      control={form.control}
                      name="selectedFolders"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={folder.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(folder.name)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    return field.onChange([
                                      ...field.value,
                                      folder.name,
                                    ]);
                                  } else {
                                    return field.onChange(
                                      field.value?.filter(
                                        (value) => value !== folder.name,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {folder.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="numOfDoughballs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of dough balls</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the number of dough balls" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup className="max-h-40">
                    {getArrayFromOneTo(16).map((num) => (
                      <SelectItem value={`${num}`} key={num}>
                        <span className="pr-1">{num}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="mt-12 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          Ingredients
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:order-2">
            <FormField
              control={form.control}
              name="selectedOptionalIngredients"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Optional ingredients
                    </FormLabel>
                    <FormDescription>
                      Select the ingredients you want to add to your recipe.
                    </FormDescription>
                  </div>
                  {optionalIngredients.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="selectedOptionalIngredients"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    return field.onChange([
                                      ...field.value,
                                      item.id,
                                    ]);
                                  } else {
                                    form.resetField(`${item.id}`);
                                    return field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            {ingredients.map((ingredient) => (
              <FormField
                key={ingredient.id}
                control={form.control}
                name={`${ingredient.id}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ingredient.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder={`Enter the amount of ${ingredient.label.toLowerCase()} (in grams)`}
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
            {optionalIngredients
              .filter((ingredient) => selectedOptions.includes(ingredient.id))
              .map((ingredient) => (
                <FormField
                  key={ingredient.id}
                  control={form.control}
                  name={`${ingredient.id}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ingredient.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={`Enter the amount of ${ingredient.label.toLowerCase()} (in grams)`}
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
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add notes about the recipe"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Link
            href={`/myrecipes/${folderName}`}
            className={`${buttonVariants({ variant: "secondary" })}`}
          >
            Cancel
          </Link>
          <SubmitButton type="submit" pending={pending}>
            Create recipe
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
