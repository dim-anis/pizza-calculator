import { getAllFolders, getIngredients } from "@/lib/queries";
import CreateRecipeForm from "./create-recipe-form";

export default async function CreateRecipePage() {
  const userFolders = await getAllFolders();
  const userIngredients = await getIngredients();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create a recipe
      </h2>
      <CreateRecipeForm
        userFolders={userFolders}
        userIngredients={userIngredients}
      />
    </>
  );
}
