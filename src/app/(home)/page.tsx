import Calculator from "./_components/calculator";
import { getDefaultRecipes } from "@/lib/queries";

export default async function Home() {
  const defaultRecipes = await getDefaultRecipes();
  return (
    <>
      <section className="space-y-6 py-6 md:pb-6 md:pt-10 lg:py-10 w-full">
        <div className="container mx-auto flex flex-col gap-4 items-center text-center">
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Effortlessly create the perfect pizza dough for any craving.
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Simply by specifying your desired type, quantity, and doughball
            weight.
          </p>
        </div>
      </section>
      <Calculator recipes={defaultRecipes} />
    </>
  );
}
