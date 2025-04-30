import { getIngredients, getIngredientTypes } from "@/lib/queries";
import IngredientForm from "../_components/ingredient-form";

export default async function CreateIngredientPage() {
  const ingredientTypes = await getIngredientTypes();
  const userIngredients = await getIngredients();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create ingredient
      </h2>
      <IngredientForm
        userIngredients={userIngredients}
        ingredientTypes={ingredientTypes}
      />
    </>
  );
}
