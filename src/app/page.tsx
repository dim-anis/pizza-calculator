"use client"

import { ChangeEvent, useState } from "react";
import Calculator, { type CalculatorFormData, type PizzaStyleName, type RecipeType, pizzaStyles, capitalize } from "./calculator";
import { snakeCaseToRegular } from "./calculator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function getRecipeIngredients<T extends PizzaStyleName>(totalDoughWeight: number, recipeForPizzaStyle: RecipeType<T>) {
  const ingredientAmounts: Record<string, number> = {};

  const totalPercentage = Object.values(recipeForPizzaStyle).reduce(
    (total, percentage) => total + percentage,
    0
  );

  for (const ingredient in recipeForPizzaStyle) {
    const amount = (totalDoughWeight * recipeForPizzaStyle[ingredient]) / totalPercentage;
    ingredientAmounts[ingredient] = amount > 100 ? Math.round(amount) : Number(amount.toFixed(1));
  }

  return ingredientAmounts;
}

const defaultSettings = {
  number_of_pizzas: 4,
  weight_per_pizza: 230,
  hydration: 65
}

export default function Home() {
  const [pizzaStyle, setPizzaStyle] = useState<PizzaStyleName>("neapolitan_home_oven");
  const [calculatorSettings, setCalculatorSettings] = useState(defaultSettings);
  const [doughIngredients, setDoughIngredients] = useState(pizzaStyles[pizzaStyle]);

  function handleSubmit(values: CalculatorFormData) {
    setDoughIngredients({
      ...doughIngredients,
      water: values.settings.hydration / 100
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

  const { number_of_pizzas, weight_per_pizza } = calculatorSettings;
  const recipeIngredients = getRecipeIngredients(number_of_pizzas * weight_per_pizza, doughIngredients);

  return (
    <main className="grid sm:grid-flow-col sm:auto-cols-fr gap-10 mx-auto my-10">
      <Calculator
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        defaultValues={{ pizzaStyle, settings: calculatorSettings }}
      />
      <article className="prose">
        <h2>{snakeCaseToRegular(pizzaStyle).split(" ").map((word) => capitalize(word)).join(" ")}</h2>
        <h3>You will need:</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Object.entries(recipeIngredients).map(([ingredient, amount]) => (
                <TableRow key={ingredient}>
                  <TableCell>
                    {capitalize(ingredient)}
                  </TableCell>
                  <TableCell className="text-right">{amount}g</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </article>
    </main>
  )
}
