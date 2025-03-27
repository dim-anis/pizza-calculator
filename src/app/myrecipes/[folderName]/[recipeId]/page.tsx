import { getRecipeWithIngredientsWithFolders } from "@/lib/queries";
import { RecipeToolbar } from "../_components/toolbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import RecipeDetails from "./recipe-details";
import { Icons } from "@/components/icons";

type Params = {
  params: Promise<{ recipeId: string }>;
};

export default async function RecipePage({ params }: Params) {
  const { recipeId } = await params;
  const recipe = await getRecipeWithIngredientsWithFolders(recipeId);

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
                href={`/myrecipes/${encodeURIComponent(folder.name)}`}
                key={folder.id}
                className={`${buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })} inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-dashed border-input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
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
