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
import {
  DefaultValues,
  UseFormReset,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BakersFormulaForm,
  bakersFormulaSchema,
  RecipeWithGroupedIngredients,
} from "@/lib/types";

type Props = {
  type?: "defaultForm" | "advancedForm";
  defaultValues: DefaultValues<RecipeWithGroupedIngredients>;
  recipes: RecipeWithGroupedIngredients[];
  handleSubmit: (data: BakersFormulaForm) => void;
  handleSelectChange: (
    name: string,
    setValue: UseFormReset<BakersFormulaForm>,
  ) => void;
};

export default function DefaultRecipeForm({
  type = "defaultForm",
  defaultValues,
  recipes,
  handleSubmit,
  handleSelectChange,
}: Props) {
  const form = useForm<BakersFormulaForm>({
    mode: "onChange",
    resolver: zodResolver(bakersFormulaSchema),
    defaultValues,
  });

  const { fields: flourIngredients } = useFieldArray({
    control: form.control,
    name: "ingredients.flours",
  });

  const { fields: liquidIngredients } = useFieldArray({
    control: form.control,
    name: "ingredients.liquids",
  });

  const { fields: otherIngredients } = useFieldArray({
    control: form.control,
    name: "ingredients.others",
  });

  const inputFields =
    type === "defaultForm"
      ? ([
          { id: "liquids", name: "Hydration", fieldArray: liquidIngredients },
        ] as const)
      : ([
          { id: "flours", name: "Flour", fieldArray: flourIngredients },
          { id: "liquids", name: "Hydration", fieldArray: liquidIngredients },
          { id: "others", name: "Other", fieldArray: otherIngredients },
        ] as const);

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
                    {recipes.map((recipe, idx) => {
                      return (
                        <SelectItem key={idx} value={recipe.name}>
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
          <div className="flex flex-row space-x-2">
            <FormField
              control={form.control}
              name={`servings`}
              render={({ field }) => (
                <FormItem className="grow-1">
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
              name={`servingWeight`}
              render={({ field }) => (
                <FormItem className="grow-1">
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
          </div>
          {inputFields.map((inputField) => {
            if (inputField.fieldArray.length === 1) {
              return (
                <FormField
                  key={inputField.id}
                  control={form.control}
                  name={`ingredients.${inputField.id}.0.percentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`${inputField.name} (%)`}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={`Select ${inputField.name} hydration level`}
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
              return (
                <fieldset key={inputField.id} className="rounded-xl border">
                  <legend className="px-1 py-1 ml-1">
                    <FormLabel>{inputField.name}</FormLabel>
                  </legend>
                  <div className="space-y-4 p-4">
                    {inputField.fieldArray.map(({ ingredient, id }, index) => (
                      <FormField
                        key={id}
                        control={form.control}
                        name={`ingredients.${inputField.id}.${index}.percentage`}
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
                    ))}
                  </div>
                </fieldset>
              );
            }
          })}
        </div>
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  );
}
