"use client";

import CalculatorForm, { CalculatorFormData } from "./CalculatorForm";
import pizzaStyles from "../../public/recipes.json";
import IngredientList from "./IngredientList";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getRecipeIngredients } from "./_utils/helpers";

export type PizzaStyle = {
  id: number;
  name: string;
  ingredients: {
    flour: number;
    water: number;
    salt?: number;
    yeast?: number;
    oil?: number;
  };
  settings: {
    number_of_pizzas: number;
    weight_per_pizza: number;
    hydration: number;
  };
};

const pizzaData = pizzaStyles as PizzaStyle[];

export type PizzaStyleName = keyof typeof pizzaData;
export type RecipeType = (typeof pizzaData)[PizzaStyleName];

export default function Home() {
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
    const selectedPizza = pizzaStyles.find((pizza) => pizza.name === name);
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
    <div>
      <div className="text-center relative max-w-5xl mx-auto pt-10 sm:pt-12 lg:pt-16">
        <h1 className="text-4xl text-slate-900 font-extrabold sm:text-5xl lg:text-6xl tracking-tight text-center">
          Effortlessly create the perfect pizza dough for any craving.
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
          Simply by specifying your desired type, quantity, and doughball
          weight.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-10 my-10 pt-4 sm:pt-10 lg:pt-14">
        <CalculatorForm
          pizzaRecipes={pizzaData}
          defaultValues={{
            name: defaultPizzaName,
            settings: defaultPizzaSettings,
          }}
          handleSubmit={onSubmit}
          handleSelectChange={onSelectChange}
        />
        <IngredientList userRecipe={userRecipe} />
      </div>
    </div>
  );
}
