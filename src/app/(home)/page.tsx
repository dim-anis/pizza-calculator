import { buttonVariants } from "@/components/ui/button";
import Calculator from "./_components/calculator";
import { getDefaultRecipes } from "@/lib/queries";
import Link from "next/link";
import FeatureSection from "./_components/feature-section";
import CTASection from "./_components/cta-section";

export default async function Home() {
  const defaultRecipes = await getDefaultRecipes();
  return (
    <>
      <section className="space-y-6 py-6 md:pb-6 md:pt-10 lg:py-10 w-full">
        <div className="container mx-auto flex flex-col gap-4 items-center text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:leading-[1.1]">
            Scale Recipes with Precision
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Easily adjust ingredient amounts with baker’s percentages. Choose
            from default recipes or log in to use your own.
          </p>
          <div className="space-x-2">
            <Link
              className={`${buttonVariants({
                variant: "secondary",
              })}`}
              href={`/dashboard/recipes/new`}
            >
              Create recipe
            </Link>
            <Link className={`${buttonVariants()}`} href="#calculator">
              Calculate
            </Link>
          </div>
        </div>
      </section>
      <Calculator recipes={defaultRecipes} />
      <FeatureSection />
      <CTASection />
    </>
  );
}
