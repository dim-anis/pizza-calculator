import { PizzaRecipe } from "@/lib/definitions";
import { defaultPizzaRecipes } from "../../public/recipes";
import Calculator from "./Calculator";
import Footer from "@/components/Footer";

const pizzaData = defaultPizzaRecipes as PizzaRecipe[];

export type PizzaStyleName = keyof typeof pizzaData;
export type RecipeType = (typeof pizzaData)[PizzaStyleName];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative mx-auto max-w-5xl pt-10 text-center sm:pt-12 lg:pt-16">
        <div className="container">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Effortlessly create the perfect pizza dough for any craving.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
            Simply by specifying your desired type, quantity, and doughball
            weight.
          </p>
        </div>
      </section>
      <Calculator pizzaData={pizzaData} />
      <Footer />
    </main>
  );
}
