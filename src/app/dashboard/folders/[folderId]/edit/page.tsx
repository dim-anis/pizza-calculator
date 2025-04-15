import { getFolderById } from "@/lib/queries";
import FolderForm from "../../_components/folder-form";

type Params = {
  params: Promise<{ folderId: string }>;
};

export default async function UpdateFolderPage({ params }: Params) {
  const { folderId } = await params;
  const folderWithRecipes = await getFolderById(folderId);
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Edit folder
      </h2>
      <FolderForm defaultValues={{ ...folderWithRecipes }} />
    </>
  );
}
