import { getFolderById } from "@/lib/queries";

import FolderTitleToolbar from "../_components/folder-toolbar";
import RecipeList from "../../_components/recipe-list";

type Params = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: Params) {
  const {
    name: folderName,
    id: folderId,
    recipes,
  } = await getFolderById((await params).folderId);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl truncate">
          {folderName}
        </h2>
        <FolderTitleToolbar folderId={folderId} />
      </div>
      <RecipeList recipes={recipes} />
    </>
  );
}
