"use client";

import { validationErrorMessages } from "@/app/_utils/helpers";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_INPUT_VALUE = 99999;

const IngredientSchema = z.object({
  flourAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
  waterAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    }),
});

const OptionalIngredientSchema = z.object({
  saltAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0)
    .optional(),
  yeastAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0)
    .optional(),
  sugarAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0)
    .optional(),
  oilAmount: z.coerce
    .number()
    .gt(0, {
      message: validationErrorMessages.negativeValue,
    })
    .lt(MAX_INPUT_VALUE, {
      message: validationErrorMessages.valueExceeds(MAX_INPUT_VALUE),
    })
    .default(0)
    .optional(),
});

const CreateRecipeSchema = z.object({
  folderName: z.coerce.string(),
  recipeName: z.coerce.string().min(1, { message: "Name is too short." }),
  ingredients: IngredientSchema,
  optionalIngredients: OptionalIngredientSchema,
  selectedOptionalIngredients: z.array(z.string()),
});

export type CreateRecipeData = z.infer<typeof CreateRecipeSchema>;

type Params = {
  name: string;
  id: string;
};

const ingredients = [
  {
    id: "flourAmount",
    label: "Flour",
  },
  {
    id: "waterAmount",
    label: "Water",
  },
] as const;

const optionalIngredients = [
  {
    id: "saltAmount",
    label: "Salt",
  },
  {
    id: "yeastAmount",
    label: "Yeast",
  },
  {
    id: "oilAmount",
    label: "Oil",
  },
  {
    id: "sugarAmount",
    label: "Sugar",
  },
] as const;

export default function CreateRecipeForm({
  folders,
}: {
  folders: { id: string; name: string }[];
}) {
  const params: Params = useParams();
  const folderName = params["name"];
  const form = useForm<CreateRecipeData>({
    mode: "onChange",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      recipeName: "",
      folderName: "",
      ingredients: {
        flourAmount: 0,
        waterAmount: 0,
      },
      optionalIngredients: {
        saltAmount: 0,
        yeastAmount: 0,
        oilAmount: 0,
        sugarAmount: 0,
      },
      selectedOptionalIngredients: ["saltAmount", "yeastAmount"],
    },
  });

  const selectedOptions = form.watch("selectedOptionalIngredients");

  function handleSubmit(formData: CreateRecipeData) {
    console.log(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around space-y-6 bg-white"
      >
        <div
          data-orientation="horizontal"
          role="none"
          className="h-[1px] w-full shrink-0 bg-border"
        ></div>
        <FormField
          control={form.control}
          name="recipeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe title</FormLabel>
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
          name="folderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose folder</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a folder to save your recipe in" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {folders.map((style) => {
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
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
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
        <div className="flex justify-end space-x-2">
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
