import Calculator from "./components/Calculator";
import { getDefaultRecipes } from "../(myrecipes)/myrecipes/[folder]/loaders";

export default async function Home() {
  const defaultRecipes = await getDefaultRecipes();
  return (
    <>
      <section className="space-y-6 py-6 md:pb-6 md:pt-10 lg:py-10">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Effortlessly create the perfect pizza dough for any craving.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Simply by specifying your desired type, quantity, and doughball
            weight.
          </p>
        </div>
      </section>
      <section>
        <Calculator defaultRecipes={defaultRecipes} />
      </section>
    </>
  );
}
