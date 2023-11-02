import { AllRecipesFolder, RecipeFolder } from "./SavedRecipesSection";

type FolderListItemProps = {
  folder: RecipeFolder | AllRecipesFolder;
  selected: boolean;
  handleClick: (folderId: string) => void;
};

export default function FolderListItem({
  folder,
  selected,
  handleClick,
}: FolderListItemProps) {
  return (
    <li
      className={`${
        selected ? "bg-muted hover:bg-muted" : "bg-transparent hover:underline"
      } h-9 items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
      role="tablist"
    >
      <button
        className="w-full whitespace-nowrap text-left"
        onClick={() => handleClick(folder.name)}
      >
        <div className="flex items-center justify-between">
          <p>{folder.name}</p>
          <p className="ml-5 hidden text-xs lg:block">
            {folder.recipes.length}
          </p>
        </div>
      </button>
    </li>
  );
}
