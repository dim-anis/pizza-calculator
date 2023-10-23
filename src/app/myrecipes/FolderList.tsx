import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import type { CurrFolder, RecipeFolder } from "./SavedRecipesSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FolderListProps = {
  folders: RecipeFolder[];
  currFolder: CurrFolder;
  handleClick: (name: string) => void;
};

export default function FolderList({
  folders,
  currFolder,
  handleClick,
}: FolderListProps) {
  const allItemsFolder = folders.find((folder) => folder.name === "all")!;
  const foldersWithoutAll = folders.filter(
    (folder) => folder.name !== allItemsFolder?.name,
  );
  foldersWithoutAll.sort((a, b) => a.name.localeCompare(b.name));
  const sortedFolders = [allItemsFolder, ...foldersWithoutAll];

  return (
    <div className="space-y-4 flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create new folder</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              Enter new folder&apos;s name. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">
                New name
              </Label>
              <Input
                id="folderName"
                value="Folder name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
              currFolder.name === folder.name
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
