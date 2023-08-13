'use client'

import { ChangeEvent, useState } from "react";
import Calculator, { type CalculatorFormData } from "./calculator";

export default function Home() {
  const [values, setValues] = useState<CalculatorFormData>({
    flour: 1000,
    water: 850,
    salt: 10
  });

  function handleSubmit(values: CalculatorFormData) {
    setValues(values);
    console.log(values);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value.replace(/[^0-9]/, "");
  }

  return (
    <main className="grid grid-flow-col auto-cols-fr gap-10 mx-auto my-10">
      <Calculator onSubmit={handleSubmit} onChange={handleChange} values={values} />
      <div>
        <h2 className="mb-5 text-xl font-semibold text-gray-900">Instructions:</h2>
        <ol className="space-y-1 text-lg text-gray-500 list-decimal list-inside">
          <li>
            In a bowl, combine {values.water} of warm water, sugar, and yeast. Let it sit for about 5-10 minutes, until frothy.
          </li>
          <li>
            In a large mixing bowl, combine {values.flour} of flour and {values.salt} of salt. Make a well in the center and pour in the yeast mixture and olive oil.
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
