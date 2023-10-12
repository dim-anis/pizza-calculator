"use client";

import { ChangeEvent, useState } from "react";
import Calculator, {
  type CalculatorFormData,
  type RecipeType,
} from "./calculator";
import pizzaStyles from "../../public/recipes.json";
import IngredientList from "./IngredientList";

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
const PERCENTAGE_BASE = 100;

function getRecipeIngredients(
  totalDoughWeight: number,
  recipeForPizzaStyle: PizzaStyle["ingredients"],
) {
  const ingredientAmounts: Record<string, number> = {};

  const totalPercentage = Object.values(recipeForPizzaStyle).reduce(
    (total, percentage) => total + percentage,
    0,
  );

  for (const ingredient in recipeForPizzaStyle) {
    const amount =
      (totalDoughWeight * recipeForPizzaStyle[ingredient as keyof RecipeType]) /
      totalPercentage;
    ingredientAmounts[ingredient as keyof RecipeType] =
      amount > 100 ? Math.round(amount) : Number(amount.toFixed(1));
  }

  return ingredientAmounts;
}

export default function Home() {
  const defaultPizza = pizzaData[0];
  const [selectedPizza, setSelectedPizza] = useState(defaultPizza);

  function handleSubmit(values: CalculatorFormData) {
    const updatedDoughIngredients = {
      ...selectedPizza.ingredients,
      water: values.settings.hydration / PERCENTAGE_BASE,
    };
    setSelectedPizza({
      ...selectedPizza,
      ingredients: updatedDoughIngredients,
      settings: values.settings,
    });
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value.replace(/[^0-9]/, "");
  }

  function handleSelectChange(name: string) {
    const selectedPizza = pizzaData.find((pizza) => pizza.name === name)!;
    setSelectedPizza(selectedPizza);
  }

  const { number_of_pizzas, weight_per_pizza } = selectedPizza.settings;
  const recipeIngredients = getRecipeIngredients(
    number_of_pizzas * weight_per_pizza,
    selectedPizza.ingredients,
  );

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
        <Calculator
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          defaultValues={selectedPizza}
        />
        <IngredientList
          pizzaRecipeName={selectedPizza.name}
          recipeIngredients={recipeIngredients}
        />
      </div>
    </div>
  );
}
