import Calculator from "./Calculator";
import Footer from "@/components/Footer";
import { getDefaultRecipes } from "./myrecipes/[name]/loaders";

export default async function Home() {
  const defaultRecipes = await getDefaultRecipes();
  return (
    <main className="flex-1">
      <section className="relative mx-auto max-w-5xl pt-10 text-center sm:pt-12 lg:pt-16">
        <div className="container">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Effortlessly create the perfect pizza dough for any craving.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600">
            Simply by specifying your desired type, quantity, and doughball
            weight.
          </p>
        </div>
      </section>
      <Calculator defaultRecipes={defaultRecipes} />
      <Footer />
    </main>
  );
}
