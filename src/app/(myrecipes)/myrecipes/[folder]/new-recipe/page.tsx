import { getAllFolders } from "../loaders";
import CreateRecipeForm from "./create-recipe-form";

export default async function CreateRecipePage() {
  const folders = await getAllFolders();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Create a recipe
      </h2>
      <div
        data-orientation="horizontal"
        role="none"
        className="h-[1px] w-full shrink-0 bg-border"
      ></div>
      <CreateRecipeForm folders={folders} />
    </>
  );
}
