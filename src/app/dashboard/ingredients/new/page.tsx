import { getIngredientTypes } from "@/lib/queries";
import IngredientForm from "../_components/ingredient-form";

export default async function CreateIngredientPage() {
  const ingredientTypes = await getIngredientTypes();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create ingredient
      </h2>
      <IngredientForm ingredientTypes={ingredientTypes} />
    </>
  );
}
