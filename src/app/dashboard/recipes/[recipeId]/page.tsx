import { getRecipeWithIngredientsWithFolders } from "@/lib/queries";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import RecipeDetails from "./recipe-details";
import { Icons } from "@/components/icons";
import { RecipeToolbar } from "../../_components/toolbar";

type Params = {
  params: Promise<{ recipeId: string }>;
};

export default async function RecipePage({ params }: Params) {
  const { recipeId } = await params;
  const recipe = await getRecipeWithIngredientsWithFolders(Number(recipeId));

  return (
    <div className="flex h-full flex-col items-start justify-start space-y-4">
      <RecipeToolbar />
      <div className="h-full w-full space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
            {recipe.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {recipe.folders.map((folder) => (
              <Link
                href={`/recipes/${encodeURIComponent(folder.name)}`}
                key={folder.id}
                className={`${buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}`}
              >
                <Icons.folder className="mr-1 h-4 w-4" />
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
