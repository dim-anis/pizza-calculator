"use client";

import {
  getArrayFromOneTo,
  getTotalDoughWeight,
  ingredientRatiosToQuantities,
} from "@/app/_utils/helpers";
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
import { updateRecipe } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  CreateRecipeData,
  CreateRecipeSchema,
} from "../../new-recipe/definitions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ingredients, optionalIngredients } from "../../../../../lib/data";
import { Folder } from "@prisma/client";
import { RecipeWithFolders } from "../../loaders";

type Params = {
  folder: string;
  id: string;
};

export default function EditRecipeForm({
  recipe,
  folders,
}: {
  recipe: RecipeWithFolders;
  folders: Folder[];
}) {
  const ingredientQuantities = ingredientRatiosToQuantities(
    recipe.doughballWeight,
    {
      flourRatio: recipe.flourRatio,
      waterRatio: recipe.waterRatio,
      saltRatio: recipe.saltRatio,
      yeastRatio: recipe.yeastRatio,
      sugarRatio: recipe.sugarRatio,
      oilRatio: recipe.oilRatio,
    },
  );
  const totalDoughWeight = getTotalDoughWeight(ingredientQuantities);

  const params: Params = useParams();
  const folderName = decodeURIComponent(params["folder"]);
  const form = useForm<CreateRecipeData>({
    mode: "onChange",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      name: recipe.name,
      ...ingredientQuantities,
      numOfDoughballs: totalDoughWeight / recipe.doughballWeight,
      selectedFolders: recipe.folders.map((folder) => folder.name),
      selectedOptionalIngredients: [
        ...Object.keys(ingredientQuantities).filter(
          (ingredient) =>
            ingredientQuantities[
              ingredient as keyof typeof ingredientQuantities
            ] > 0,
        ),
      ],
    },
  });

  const selectedOptions = form.watch("selectedOptionalIngredients");

  async function handleSubmit(formData: CreateRecipeData) {
    await updateRecipe(recipe.id, recipe.folders, formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around space-y-6 bg-white"
      >
        <FormField
          control={form.control}
          name="recipeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Type your recipe name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                                    form.resetField(
                                      `optionalIngredients.${item.id}`,
                                    );
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
                name={`ingredients.${ingredient.id}`}
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
                  name={`optionalIngredients.${ingredient.id}`}
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
        <div className="flex justify-end space-x-4">
          <Link
            href={`/myrecipes/${folderName}`}
            className={`${buttonVariants({ variant: "secondary" })}`}
          >
            Cancel
          </Link>
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </Form>
  );
}
