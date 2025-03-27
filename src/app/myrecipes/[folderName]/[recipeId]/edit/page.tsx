import {
  getAllFolders,
  getAllIngredients,
  getRecipeWithIngredientsWithFolders,
} from "@/lib/queries";
import EditRecipeForm from "./edit-recipe-form";

type Params = {
  params: Promise<{ recipeId: string }>;
};

export default async function EditRecipePage({ params }: Params) {
  const { recipeId } = await params;
  const userFolders = await getAllFolders();
  const userIngredients = await getAllIngredients();
  const recipe = await getRecipeWithIngredientsWithFolders(recipeId);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Edit recipe
      </h2>
      <div
        data-orientation="horizontal"
        role="none"
        className="h-[1px] w-full shrink-0 bg-border"
      ></div>
      <EditRecipeForm
        recipe={recipe}
        userFolders={userFolders}
        userIngredients={userIngredients}
      />
    </>
  );
}
