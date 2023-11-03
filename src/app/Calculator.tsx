"use client";

import { useState } from "react";
import IngredientList from "./IngredientList";
import { getRecipeIngredients } from "./_utils/helpers";
import { UseFormSetValue } from "react-hook-form";
import { PizzaRecipe } from "@/lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipesForm, { CalculatorFormData } from "./DefaultRecipesForm";
import CustomRecipeForm from "./CustomRecipeForm";

type CalculatorProps = {
  pizzaData: PizzaRecipe[];
};

export default function Calculator({ pizzaData }: CalculatorProps) {
  const {
    name: defaultPizzaName,
    settings: defaultPizzaSettings,
    ingredients: defaultPizzaIngredients,
  } = pizzaData[0];

  const { weight_per_pizza, number_of_pizzas } = defaultPizzaSettings;
  const [userRecipe, setUserRecipe] = useState({
    name: defaultPizzaName,
    settings: defaultPizzaSettings,
    ingredients: getRecipeIngredients(
      weight_per_pizza * number_of_pizzas,
      defaultPizzaIngredients,
    ),
  });

  function onSubmit(data: CalculatorFormData) {
    const { weight_per_pizza, number_of_pizzas, hydration } = data.settings;
    const totalDoughWeight = weight_per_pizza * number_of_pizzas;

    const selectedPizza = pizzaData.find((pizza) => pizza.name === data.name);

    if (selectedPizza) {
      const ingredients = getRecipeIngredients(totalDoughWeight, {
        ...selectedPizza.ingredients,
        water: hydration / 100,
      });

      setUserRecipe({
        name: data.name,
        settings: data.settings,
        ingredients,
      });
    }
  }

  function onSelectChange(
    name: string,
    setValue: UseFormSetValue<CalculatorFormData>,
  ) {
    const selectedPizza = pizzaData.find((pizza) => pizza.name === name);
    if (selectedPizza) {
      const { number_of_pizzas, weight_per_pizza } = selectedPizza.settings;
      setValue("name", selectedPizza.name);
      setValue("settings", selectedPizza.settings);
      setUserRecipe({
        name: selectedPizza.name,
        settings: selectedPizza.settings,
        ingredients: getRecipeIngredients(
          number_of_pizzas * weight_per_pizza,
          selectedPizza.ingredients,
        ),
      });
    }
  }

  return (
    <div className="my-10 grid items-center gap-10 pt-4 sm:pt-10 lg:grid-cols-2 lg:pt-14">
      <Tabs defaultValue="basicSettings">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basicSettings">Basic</TabsTrigger>
          <TabsTrigger value="advancedSettings">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="basicSettings">
          <DefaultRecipesForm
            pizzaRecipes={pizzaData}
            defaultValues={{
              name: defaultPizzaName,
              settings: defaultPizzaSettings,
            }}
            handleSubmit={onSubmit}
            handleSelectChange={onSelectChange}
          />
        </TabsContent>
        <TabsContent value="advancedSettings">
          <CustomRecipeForm
            defaultValues={{
              name: defaultPizzaName,
              settings: defaultPizzaSettings,
            }}
            handleSubmit={onSubmit}
          />
        </TabsContent>
      </Tabs>
      <IngredientList userRecipe={userRecipe} />
    </div>
  );
}
