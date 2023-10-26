import Search from "@/components/Search";
import type { RecipeFolder } from "./SavedRecipesSection";
import { CreateFolderDialog } from "./CreateFolderDialog";

type FolderListProps = {
  folders: RecipeFolder[];
  currFolder: RecipeFolder | null;
  handleClick: (name: string) => void;
};

export default function FolderList({
  folders,
  currFolder,
  handleClick,
}: FolderListProps) {
  const allItemsFolder = folders.find((folder) => folder.name === "all");

  let sortedFolders: RecipeFolder[];
  if (typeof allItemsFolder === "undefined") {
    sortedFolders = folders;
  } else {
    const foldersWithoutAll = folders.filter(
      (folder) => folder.name !== allItemsFolder?.name,
    );
    foldersWithoutAll.sort((a, b) => a.name.localeCompare(b.name));
    sortedFolders = [allItemsFolder, ...foldersWithoutAll];
  }

  return (
    <div className="space-y-4 flex flex-col">
      <CreateFolderDialog />
      <Search
        recipes={
          folders.find((folder) => folder.name === allItemsFolder?.name)
            ?.recipes ?? []
        }
      />
      <ul className="mt-2 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {sortedFolders.map((folder) => (
          <li
            className={`${
              currFolder?.name === folder.name
                ? "bg-muted hover:bg-muted"
                : "bg-transparent hover:underline"
            } items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start`}
            role="tablist"
            key={folder.name}
          >
            <button
              className="w-full text-left"
              onClick={() => handleClick(folder.name)}
            >
              <div className="flex justify-between items-center">
                <p>{folder.name}</p>
                <p className="text-xs">{folder.recipes.length}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
