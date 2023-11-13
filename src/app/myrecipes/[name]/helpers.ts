import { AllRecipesFolder, RecipeFolder } from "@/lib/definitions";
import { Recipe } from "@prisma/client";

export function flattenRecipes(
  folders: (RecipeFolder | AllRecipesFolder)[],
): Recipe[] {
  return folders.reduce(
    (acc, curr) => [...acc, ...curr.recipes],
    [] as Recipe[],
  );
}
