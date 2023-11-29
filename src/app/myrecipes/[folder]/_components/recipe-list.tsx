import { getFolderWithRecipes } from "../loaders";
import RecipeItem from "./recipe-item";
import FolderEmptyView from "../folder-empty-view";
import FolderTitleToolbar from "./folder-toolbar";

export default async function RecipeList({
  folderName,
}: {
  folderName: string;
}) {
  let decodedFolderName: string = decodeURIComponent(folderName);
  const folder = await getFolderWithRecipes(decodedFolderName);
  const originalFolderName = folder?.name;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {originalFolderName}
        </h2>
        <FolderTitleToolbar folderName={folderName} folderId={folder.id} />
      </div>
      {folder?.recipes?.length === 0 ? (
        <FolderEmptyView />
      ) : (
        <ul className="flex flex-col space-y-2">
          {folder?.recipes?.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              folderName={folderName}
            />
          ))}
        </ul>
      )}
    </>
  );
}
