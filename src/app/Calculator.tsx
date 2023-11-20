"use client";

import { useState } from "react";
import IngredientList from "./IngredientList";
import { getRecipeIngredientQuantities } from "./_utils/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipesForm, { CalculatorFormData } from "./DefaultRecipesForm";
// import CustomRecipeForm from "./CustomRecipeForm";
import { RecipeParsed } from "@/lib/definitions";
import { UseFormReset } from "react-hook-form";

type CalculatorProps = {
  defaultRecipes: RecipeParsed[];
};

export default function Calculator({ defaultRecipes }: CalculatorProps) {
  const [userRecipe, setUserRecipe] = useState<RecipeParsed>();
  const [numOfPizzas, setNumOfPizzas] = useState(2);
  const recipe = userRecipe || defaultRecipes[0];

  const ingredientQuantities = getRecipeIngredientQuantities(
    numOfPizzas * recipe.doughballWeight,
    recipe.ingredientRatios,
  );

  function onSubmit(formData: CalculatorFormData) {
    const {
      settings: { number_of_pizzas, hydration },
    } = formData;

    const updatedIngredientRatios = {
      ...recipe.ingredientRatios,
      water: hydration / 100,
    };

    setNumOfPizzas(number_of_pizzas);
    setUserRecipe({
      ...recipe,
      ingredientRatios: updatedIngredientRatios,
    });
  }

  function onSelectChange(
    recipeName: string,
    resetForm: UseFormReset<CalculatorFormData>,
  ) {
    const selectedRecipe = defaultRecipes.find(
      (recipe) => recipe.name === recipeName,
    );
    if (selectedRecipe) {
      setUserRecipe(selectedRecipe);
      resetForm({
        name: selectedRecipe.name,
        settings: {
          number_of_pizzas: numOfPizzas,
          weight_per_pizza: selectedRecipe.doughballWeight,
          hydration: selectedRecipe.ingredientRatios.water * 100,
        },
      });
    }
  }

  return (
    <section className="container space-y-6 py-4 md:py-6 lg:py-12">
      <div className="mx-auto grid items-center gap-5 md:max-w-[64rem] md:grid-cols-2">
        <Tabs defaultValue="basicSettings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basicSettings">Basic</TabsTrigger>
            <TabsTrigger value="advancedSettings">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="basicSettings">
            <DefaultRecipesForm
              pizzaRecipes={defaultRecipes}
              defaultValues={{
                name: recipe.name,
                settings: {
                  number_of_pizzas: numOfPizzas,
                  weight_per_pizza: recipe.doughballWeight,
                  hydration: recipe.ingredientRatios.water * 100,
                },
              }}
              handleSubmit={onSubmit}
              handleSelectChange={onSelectChange}
            />
          </TabsContent>
          {/* <TabsContent value="advancedSettings"> */}
          {/*   <CustomRecipeForm */}
          {/*     defaultValues={{ */}
          {/*       name: defaultPizzaName, */}
          {/*       settings: defaultPizzaSettings, */}
          {/*     }} */}
          {/*     handleSubmit={onSubmit} */}
          {/*   /> */}
          {/* </TabsContent> */}
        </Tabs>
        <div className="w-full rounded-xl border bg-card p-8 text-card-foreground shadow">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
            {recipe.name}
          </h2>
          <p className="mt-7 max-w-3xl text-lg text-slate-600">Ingredients:</p>
          <IngredientList ingredients={ingredientQuantities} />
        </div>
      </div>
    </section>
  );
}
