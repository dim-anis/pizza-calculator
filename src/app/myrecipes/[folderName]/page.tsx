import { getFolderWithRecipes } from "@/lib/queries";
import RecipeList from "../_components/recipe-list";
import FolderTitleToolbar from "./_components/folder-toolbar";

type Params = {
  params: Promise<{ folderName: string }>;
};

export default async function FolderPage({ params }: Params) {
  const {
    name: folderName,
    id: folderId,
    recipes,
  } = await getFolderWithRecipes(decodeURIComponent((await params).folderName));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {folderName}
        </h2>
        <FolderTitleToolbar folderName={folderName} folderId={folderId} />
      </div>
      <RecipeList recipes={recipes} folderName={folderName} />
    </>
  );
}
