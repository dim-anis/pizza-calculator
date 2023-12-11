import { toTitleCase } from "@/lib/helpers";
import { getFolderWithRecipes } from "../../../../../lib/queries";
import EditFolderForm from "./edit-folder-form";

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
        Edit folder
      </h2>
      <EditFolderForm oldFolderName={folderWithRecipes.name} />
    </>
  );
}
