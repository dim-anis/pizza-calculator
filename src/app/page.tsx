import pizzaStyles from "../../public/recipes.json";
import Calculator from "./Calculator";

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
  return (
    <div>
      <div className="relative mx-auto max-w-5xl pt-10 text-center sm:pt-12 lg:pt-16">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Effortlessly create the perfect pizza dough for any craving.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
          Simply by specifying your desired type, quantity, and doughball
          weight.
        </p>
      </div>
      <Calculator pizzaData={pizzaData} />
    </div>
  );
}
