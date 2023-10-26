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
      <div className="text-center relative max-w-5xl mx-auto pt-10 sm:pt-12 lg:pt-16">
        <h1 className="text-4xl text-slate-900 font-extrabold sm:text-5xl lg:text-6xl tracking-tight text-center">
          Effortlessly create the perfect pizza dough for any craving.
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
          Simply by specifying your desired type, quantity, and doughball
          weight.
        </p>
      </div>
      <Calculator pizzaData={pizzaData} />
    </div>
  );
}
