import { toTitleCase } from "@/app/_utils/helpers";
import { getFolderWithRecipes } from "../loaders";
import EditRecipeForm from "./update-form";

export default async function UpdateFolderPage({
  params,
}: {
  params: { folder: string };
}) {
  const originalFolderName = toTitleCase(decodeURIComponent(params.folder));
  const folderWithRecipes = await getFolderWithRecipes(originalFolderName);
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Update folder
      </h2>
      <div
        data-orientation="horizontal"
        role="none"
        className="h-[1px] w-full shrink-0 bg-border"
      ></div>
      <EditRecipeForm oldFolderName={folderWithRecipes.name} />
    </>
  );
}
