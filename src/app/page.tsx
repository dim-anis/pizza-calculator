"use client"

import { ChangeEvent, useState } from "react";
import Calculator, { type CalculatorFormData, type PizzaStyleName, type RecipeType, pizzaStyles } from "./calculator";
import { capitalizeEveryFirstChar } from "./calculator";

function getRecipeIngredients<T extends PizzaStyleName>(totalDoughWeight: number, recipeForPizzaStyle: RecipeType<T>) {
  let ingredients: Record<string, number> = {};
  for (const [ingredient, percentage] of Object.entries(recipeForPizzaStyle)) {
    const amount = (percentage / 100) * totalDoughWeight;
    ingredients[ingredient] = amount < 100 ? Number(amount.toFixed(1)) : Math.round(amount);
  }

  return ingredients;
}

const defaultSettings = {
  numberOfPizzas: 4,
  weightPerPizza: 230,
  hydration: 65
}

export default function Home() {
  const [pizzaStyle, setPizzaStyle] = useState<PizzaStyleName>("neapolitan_home_oven");
  const [calculatorSettings, setCalculatorSettings] = useState(defaultSettings);
  const [doughIngredients, setDoughIngredients] = useState(pizzaStyles[pizzaStyle]);


  function handleSubmit(values: CalculatorFormData) {
    setDoughIngredients({
      ...doughIngredients,
      water: values.settings.hydration
    })
    setCalculatorSettings(values.settings);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value.replace(/[^0-9]/, "");
  }

  function handleSelectChange(value: PizzaStyleName) {
    setPizzaStyle(value);
    setDoughIngredients(pizzaStyles[value]);
  }

  const { numberOfPizzas, weightPerPizza } = calculatorSettings;
  const recipeIngredients = getRecipeIngredients(numberOfPizzas * weightPerPizza, doughIngredients);

  return (
    <main className="grid sm:grid-flow-col sm:auto-cols-fr gap-10 mx-auto my-10">
      <Calculator
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        defaultValues={{ pizzaStyle, settings: calculatorSettings }}
      />
      <div>
        <h2 className="mb-5 text-xl font-semibold text-gray-900">You will need:</h2>
        <ol className="space-y-1 text-lg text-gray-500 list-decimal list-inside">
          {
            Object.entries(recipeIngredients).map(([ingredient, amount]) => (
              <li key={ingredient}>
                {capitalizeEveryFirstChar(ingredient)} - {amount + (ingredient === "oil" || ingredient === "water" ? "ml" : "g")}
              </li>
            ))
          }
        </ol>
      </div>
    </main>
  )
}
