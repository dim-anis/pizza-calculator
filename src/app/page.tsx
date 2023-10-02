"use client";

import { ChangeEvent, useState } from "react";
import Calculator, {
  type CalculatorFormData,
  type PizzaStyleName,
  type RecipeType,
} from "./calculator";
import pizzaStyles from "../../public/recipes.json";
import IngredientList from "./IngredientList";

function getRecipeIngredients(
  totalDoughWeight: number,
  recipeForPizzaStyle: RecipeType
) {
  const ingredientAmounts: Record<string, number> = {};

  const totalPercentage = Object.values(recipeForPizzaStyle).reduce(
    (total, percentage) => total + percentage,
    0
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

const defaultSettings = {
  number_of_pizzas: 4,
  weight_per_pizza: 220,
  hydration: 65,
};

export default function Home() {
  const [pizzaStyle, setPizzaStyle] = useState<PizzaStyleName>(
    "neapolitan_home_oven"
  );
  const [calculatorSettings, setCalculatorSettings] = useState(defaultSettings);
  const [doughIngredients, setDoughIngredients] = useState(
    pizzaStyles[pizzaStyle]
  );

  function handleSubmit(values: CalculatorFormData) {
    setDoughIngredients({
      ...doughIngredients,
      water: values.settings.hydration / 100,
    });
    setCalculatorSettings(values.settings);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value.replace(/[^0-9]/, "");
  }

  function handleSelectChange(value: PizzaStyleName) {
    setPizzaStyle(value);
    setDoughIngredients(pizzaStyles[value]);
  }

  const { number_of_pizzas, weight_per_pizza } = calculatorSettings;
  const recipeIngredients = getRecipeIngredients(
    number_of_pizzas * weight_per_pizza,
    doughIngredients
  );

  return (
    <section>
      <div className="relative max-w-5xl mx-auto pt-10 sm:pt-12 lg:pt-16">
        <h1 className="text-4xl text-slate-900 font-extrabold sm:text-5xl lg:text-6xl tracking-tight text-center">
          Pizza Calculator
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
          Craft Perfect Pizzas Every Time
        </p>
      </div>
      <div className="grid sm:grid-flow-col sm:auto-cols-fr gap-10 mx-auto my-10 pt-4 sm:pt-10 lg:pt-14">
        <Calculator
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          defaultValues={{ pizzaStyle, settings: calculatorSettings }}
        />
      </div>
      <IngredientList
        pizzaStyle={pizzaStyle}
        recipeIngredients={recipeIngredients}
      />
    </section>
  );
}
