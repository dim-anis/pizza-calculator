"use client"

import { ChangeEvent, useState } from "react";
import Calculator, { CalculatorFormData } from "./calculator";
import { pizzaStyles } from "./calculator";

export type PizzaStyleNames = keyof typeof pizzaStyles;

export default function Home() {
  const [pizzaStyle, setPizzaStyle] = useState<PizzaStyleNames>("neapolitan")
  const [doughIngredients, setDoughIngredients] = useState(pizzaStyles[pizzaStyle]);

  function handleSubmit(values: CalculatorFormData) {
    setDoughIngredients(values.ingredients);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value.replace(/[^0-9]/, "");
  }

  function handleSelectChange(value: PizzaStyleNames) {
    setPizzaStyle(value);
    setDoughIngredients(pizzaStyles[value]);
  }

  return (
    <main className="grid sm:grid-flow-col sm:auto-cols-fr gap-10 mx-auto my-10">
      <Calculator
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        defaultValues={{ pizzaStyle, ingredients: doughIngredients }}
      />
      <div>
        <h2 className="mb-5 text-xl font-semibold text-gray-900">Instructions:</h2>
        <ol className="space-y-1 text-lg text-gray-500 list-decimal list-inside">
          <li>
            In a bowl, combine <b>{doughIngredients.water}</b> grams of warm water, sugar, and yeast. Let it sit for about 5-10 minutes, until frothy.
          </li>
          <li>
            In a large mixing bowl, combine <b>{doughIngredients.flour}</b> of flour and <b>{doughIngredients.salt}</b> grams of salt. Make a well in the center and pour in the yeast mixture and olive oil.
          </li>
          <li>
            Mix until the dough comes together, then knead on a floured surface for about 5-7 minutes, until smooth and elastic.
          </li>
          <li>
            Place the dough in a lightly oiled bowl, cover with a damp cloth, and let it rise in a warm place for about 1-2 hours, or until doubled in size.
          </li>
        </ol>
      </div>
    </main>
  )
}
