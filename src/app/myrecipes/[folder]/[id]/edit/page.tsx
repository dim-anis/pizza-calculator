import {
  getTotalDoughWeight,
  ingredientRatiosToQuantities,
} from "@/app/_utils/helpers";
import { getAllFolders, getRecipeWithFolders } from "../../loaders";
import EditRecipeForm from "./edit-recipe-form";

export default async function CreateRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const folders = await getAllFolders();
  const recipe = await getRecipeWithFolders(params.id);

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
      <EditRecipeForm recipe={recipe} folders={folders} />
    </>
  );
}
