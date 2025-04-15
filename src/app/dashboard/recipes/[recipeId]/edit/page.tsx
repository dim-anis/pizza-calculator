import {
  getAllFolders,
  getIngredients,
  getRecipeWithIngredientsWithFolders,
} from "@/lib/queries";
import EditRecipeForm from "./edit-recipe-form";

type Params = {
  params: Promise<{ recipeId: string }>;
};

export default async function EditRecipePage({ params }: Params) {
  const { recipeId } = await params;
  const userFolders = await getAllFolders();
  const userIngredients = await getIngredients();
  const recipe = await getRecipeWithIngredientsWithFolders(Number(recipeId));

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Edit recipe
      </h2>
      <EditRecipeForm
        recipe={recipe}
        userFolders={userFolders}
        userIngredients={userIngredients}
      />
    </>
  );
}
