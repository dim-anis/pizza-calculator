"use client";

import { useState } from "react";
import IngredientList from "@/components/ingredient-list";
import { calculateIngredientWeights } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipesForm from "./default-recipes-form";
import { UseFormReset } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { BakersFormulaForm, RecipeWithIngredients } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  recipes: RecipeWithIngredients[];
};

export default function Calculator({ recipes }: Props) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithIngredients>(
    recipes[0],
  );

  const ingredientsWithWeights = calculateIngredientWeights(
    selectedRecipe.recipeServing.quantity * selectedRecipe.recipeServing.weight,
    selectedRecipe.ingredients,
  );

  function onSubmit(updatedRecipe: BakersFormulaForm) {
    //@ts-expect-error figure out later, not important
    setSelectedRecipe({
      ...updatedRecipe,
      ingredients: updatedRecipe.ingredients.map((i) => ({
        ...i,
        percentage: i.percentage * 100,
      })),
    });
  }

  function onSelectChange(
    recipeName: string,
    resetForm: UseFormReset<BakersFormulaForm>,
  ) {
    const selectedRecipe = recipes.find((recipe) => recipe.name === recipeName);
    if (selectedRecipe) {
      setSelectedRecipe(selectedRecipe);
      resetForm(selectedRecipe);
    }
  }

  return (
    <section className="container mx-auto space-y-3 py-4 md:py-6 lg:py-12">
      <div className="mx-auto grid items-center gap-6 max-w-5xl md:grid-cols-2 border-1 p-6 rounded-2xl">
        <Tabs defaultValue="basicSettings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basicSettings">Basic</TabsTrigger>
            <TabsTrigger value="advancedSettings" disabled>
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basicSettings">
            <DefaultRecipesForm
              recipes={recipes}
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
        <Card>
          <CardHeader>
            <div className="flex justify-end gap-2">
              <Button variant={"secondary"} size={"sm"}>
                <Icons.bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant={"secondary"} size={"sm"}>
                <Icons.print className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
              {selectedRecipe.name}
            </h2>
          </CardHeader>
          <CardContent>
            <IngredientList ingredients={ingredientsWithWeights} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
