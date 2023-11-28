import { getRecipeById } from "../loaders";
import { Toolbar } from "../_components/toolbar";
import { buttonVariants } from "@/components/ui/button";
import { Folder } from "lucide-react";
import Link from "next/link";
import RecipeDetails from "./recipe-details";

export default async function RecipePage({
  params,
}: {
  params: { name: string; id: string };
}) {
  const recipe = await getRecipeById(params.id);

  return (
    <div className="flex h-full flex-col items-start justify-start space-y-4">
      <Toolbar />
      <div className="h-full w-full space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
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
        <RecipeDetails recipe={recipe} />
      </div>
    </div>
  );
}
