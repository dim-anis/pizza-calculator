"use client";

import { useState } from "react";
import IngredientList from "@/components/ingredient-list";
import { ingredientRatiosToQuantities } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipesForm, { CalculatorFormData } from "./DefaultRecipesForm";
// import CustomRecipeForm from "./CustomRecipeForm";
import { UseFormReset } from "react-hook-form";
import { Recipe } from "@prisma/client";

type CalculatorProps = {
  defaultRecipes: Recipe[];
};

export default function Calculator({ defaultRecipes }: CalculatorProps) {
  const [userRecipe, setUserRecipe] = useState<Recipe>();
  const [numOfDoughballs, setNumOfDoughballs] = useState(2);
  const recipe = userRecipe || defaultRecipes[0];

  const ingredientQuantities = ingredientRatiosToQuantities(
    numOfDoughballs * recipe.doughballWeight,
    {
      flourRatio: recipe.flourRatio,
      waterRatio: recipe.waterRatio,
      saltRatio: recipe.saltRatio,
      yeastRatio: recipe.yeastRatio,
      sugarRatio: recipe.sugarRatio,
      oilRatio: recipe.oilRatio,
    },
  );

  function onSubmit(formData: CalculatorFormData) {
    const {
      settings: { numOfDoughballs, doughHydration, doughballWeight },
    } = formData;

    setNumOfDoughballs(numOfDoughballs);
    setUserRecipe({
      ...recipe,
      waterRatio: doughHydration / 100,
      doughballWeight,
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
          numOfDoughballs: numOfDoughballs,
          doughballWeight: selectedRecipe.doughballWeight,
          doughHydration: selectedRecipe.waterRatio * 100,
        },
      });
    }
  }

  return (
    <section className="container space-y-3 py-4 md:py-6 lg:py-12">
      <div className="mx-auto grid items-center gap-6 md:max-w-[64rem] md:grid-cols-2">
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
                  numOfDoughballs: numOfDoughballs,
                  doughballWeight: recipe.doughballWeight,
                  doughHydration: Number(recipe.waterRatio) * 100,
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
          <IngredientList ingredientAmounts={ingredientQuantities} />
        </div>
      </div>
    </section>
  );
}
