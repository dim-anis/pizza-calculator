import {
  getTotalDoughWeight,
  ingredientRatiosToQuantities,
} from "@/app/_utils/helpers";
import { getAllFolders, getRecipeById } from "../../loaders";
import EditRecipeForm from "./edit-recipe-form";

export default async function CreateRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const folders = await getAllFolders();
  const recipe = await getRecipeById(params.id);

  const ingredientQuantities = ingredientRatiosToQuantities(
    recipe.doughballWeight,
    recipe.ingredientRatios,
  );
  const ingredients = {
    waterAmount: ingredientQuantities.water,
    flourAmount: ingredientQuantities.flour,
  };
  const optionalIngredients = {
    saltAmount: ingredientQuantities.salt,
    yeastAmount: ingredientQuantities.yeast,
    sugarAmount: ingredientQuantities.sugar,
    oilAmount: ingredientQuantities.oil,
  };
  const totalDoughWeight = getTotalDoughWeight({
    ...ingredients,
    ...optionalIngredients,
  });

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
        defaultValues={{
          recipeName: recipe.name,
          ingredients,
          numOfDoughballs: totalDoughWeight / recipe.doughballWeight,
          optionalIngredients,
          selectedOptionalIngredients: [
            ...Object.keys(ingredientQuantities)
              .filter(
                (ingredient) =>
                  ingredientQuantities[
                    ingredient as keyof typeof ingredientQuantities
                  ] > 0,
              )
              .map((key) => `${key}Amount`),
          ],
        }}
      />
    </>
  );
}
