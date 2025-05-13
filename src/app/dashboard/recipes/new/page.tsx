import { getAllFolders, getIngredients } from "@/lib/queries";
import RecipeForm from "../_components/recipe-form";

export default async function CreateRecipePage() {
  const userFolders = await getAllFolders();
  const userIngredients = await getIngredients();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create a recipe
      </h2>
      <RecipeForm userFolders={userFolders} userIngredients={userIngredients} />
    </>
  );
}
