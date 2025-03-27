import { toTitleCase } from "@/lib/helpers";
import { getFolderWithRecipes } from "@/lib/queries";
import EditFolderForm from "./edit-folder-form";

type Params = {
  params: Promise<{ folderName: string }>;
};

export default async function UpdateFolderPage({ params }: Params) {
  const { folderName } = await params;
  const originalFolderName = toTitleCase(decodeURIComponent(folderName));
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
