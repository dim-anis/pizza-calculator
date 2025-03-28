import { buttonVariants } from "@/components/ui/button";
import Calculator from "./_components/calculator";
import { getDefaultRecipes } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  const defaultRecipes = await getDefaultRecipes();
  const folderName = encodeURIComponent("All recipes");
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
              })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
              href="#calculator"
            >
              Create recipe
            </Link>
            <Link
              className={`${buttonVariants({
                variant: "default",
              })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
              href={`/myrecipes/${folderName}/new-recipe`}
            >
              Calculate
            </Link>
          </div>
        </div>
      </section>
      <Calculator recipes={defaultRecipes} />
    </>
  );
}
