import { getIngredientById, getRecipesWithIngredient } from "@/lib/queries";
import RecipeList from "../../_components/recipe-list";

type Params = {
  params: Promise<{ ingredientId: string }>;
};

export default async function IngredientPage({ params }: Params) {
  const { ingredientId } = await params;
  const ingredient = await getIngredientById(Number(ingredientId));
  const recipes = await getRecipesWithIngredient(Number(ingredientId));

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        {`Recipes with "${ingredient.name}"`}
      </h2>
      <RecipeList recipes={recipes} />
    </>
  );
}
