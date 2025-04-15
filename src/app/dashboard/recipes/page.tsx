import { getAllRecipes } from "@/lib/queries";
import RecipeList from "../_components/recipe-list";

export default async function MyRecipesPage() {
  const allRecipes = await getAllRecipes();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        All recipes
      </h2>
      <RecipeList recipes={allRecipes} />
    </>
  );
}
