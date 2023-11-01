"use client";

import { useState } from "react";
import CalculatorForm, { CalculatorFormData } from "./CalculatorForm";
import IngredientList from "./IngredientList";
import { getRecipeIngredients } from "./_utils/helpers";
import { UseFormSetValue } from "react-hook-form";
import { PizzaStyle } from "./page";

type CalculatorProps = {
  pizzaData: PizzaStyle[];
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
      <CalculatorForm
        defaultValues={{
          name: defaultPizzaName,
          settings: defaultPizzaSettings,
        }}
        pizzaRecipes={pizzaData}
        handleSubmit={onSubmit}
        handleSelectChange={onSelectChange}
      />
      <IngredientList userRecipe={userRecipe} />
    </div>
  );
}
