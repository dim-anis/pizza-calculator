import {
  getIngredientById,
  getIngredients,
  getIngredientTypes,
} from "@/lib/queries";
import IngredientForm from "../../_components/ingredient-form";

type Params = {
  params: Promise<{ ingredientId: string }>;
};

export default async function EditIngredientPage({ params }: Params) {
  const { ingredientId } = await params;
  const ingredientTypes = await getIngredientTypes();
  const ingredient = await getIngredientById(Number(ingredientId));
  const userIngredients = await getIngredients();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Edit ingredient
      </h2>
      <IngredientForm
        defaultValues={{
          ...ingredient,
          type: ingredient.type.type,
          components: ingredient.components,
        }}
        userIngredients={userIngredients}
        ingredientTypes={ingredientTypes}
      />
    </>
  );
}
