import IngredientList from "@/app/IngredientList";
import { getRecipeById } from "../loaders";
import { Toolbar } from "../toolbar";
import { buttonVariants } from "@/components/ui/button";
import { Folder } from "lucide-react";
import Link from "next/link";
import BakersCard from "./bakers-card";

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const recipe = await getRecipeById(params.id);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10">
      <div className="flex h-full flex-col items-start justify-start space-y-5 text-gray-500">
        <Toolbar />
        <div className="h-full w-full space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-primary lg:text-3xl">
              {recipe?.name}
            </h2>
            <div className="flex space-x-2">
              {recipe?.folders.map((folder) => (
                <Link
                  href={`/myrecipes/${folder.name}`}
                  key={folder.id}
                  className={`${buttonVariants({
                    variant: "ghost",
                  })} inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-dashed border-input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  {folder.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* {recipe.ingredients.map((ingredient) => ( */}
              {/*   <BakersCard */}
              {/*     key={ingredient.name} */}
              {/*     name={ingredient.name} */}
              {/*     percentage={ingredient.proportion} */}
              {/*   /> */}
              {/* ))} */}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <h3 className="font-semibold text-primary lg:text-lg">
                Ingredients:
              </h3>
              <IngredientList ingredients={recipe.ingredients} />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary lg:text-lg">Notes:</h3>
              <p>Some notes about the recipe.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
