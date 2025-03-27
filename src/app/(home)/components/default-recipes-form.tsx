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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReset, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BakersFormulaForm,
  bakersFormulaSchema,
  RecipeWithIngredients,
} from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  recipes: RecipeWithIngredients[];
  handleSubmit: (data: BakersFormulaForm) => void;
  handleSelectChange: (
    name: string,
    setValue: UseFormReset<BakersFormulaForm>,
  ) => void;
};

export default function DefaultRecipesForm({
  recipes,
  handleSubmit,
  handleSelectChange,
}: Props) {
  const form = useForm<BakersFormulaForm>({
    mode: "onChange",
    resolver: zodResolver(bakersFormulaSchema),
    defaultValues: {
      ...recipes[0],
      ingredients: recipes[0].ingredients.map((i) => ({
        ...i,
        percentage: i.percentage * 100,
      })),
    },
  });

  const { fields: ingredients } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const liquidIngredients = ingredients.filter(
    ({ ingredient }) => ingredient.type.isLiquid,
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-around gap-5 bg-white"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(handleSelectChange(value, form.reset))
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {recipes.map((recipe) => {
                      return (
                        <SelectItem key={recipe.id} value={recipe.name}>
                          {recipe.name}
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
            name={`recipeServing.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of servings</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder={`Select number of servings`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`recipeServing.weight`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight per serving</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder={`Select serving weight`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {liquidIngredients.length > 1 ? (
            <div className="space-y-2">
              <FormLabel>Hydration (composite)</FormLabel>
              <Card className="shadow-none bg-muted border-none">
                <CardContent className="space-y-4">
                  {ingredients.map(({ ingredient, id }, index) => {
                    if (ingredient.type.isLiquid) {
                      return (
                        <FormField
                          key={id}
                          control={form.control}
                          name={`ingredients.${index}.percentage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{`${ingredient.name} (%)`}</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder={`Select ${ingredient.name} hydration level`}
                                  className="bg-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </CardContent>
              </Card>
            </div>
          ) : (
            ingredients.map(({ ingredient, id }, index) => {
              return (
                <FormField
                  key={id}
                  control={form.control}
                  name={`ingredients.${index}.percentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Hydration ${ingredient.name}`}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={`Select hydration level`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })
          )}
        </div>
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  );
}
