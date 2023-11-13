import { getFolderNamesWithRecipeCount } from "./loaders";
import FolderItem from "./folder-list-item";
import { Button } from "@/components/ui/button";

export default async function FolderList() {
  const folderNames = await getFolderNamesWithRecipeCount();
  return (
    <aside className="fixed top-14 z-30 hidden w-full shrink-0 overflow-y-auto py-6 md:sticky md:block md:h-[calc(100vh-3.5rem)] lg:py-10">
      <div className="flex flex-col space-y-4">
        <Button variant="outline">Create new folder</Button>
        <nav>
          <ul className="flex space-y-1 md:flex-col lg:space-x-0">
            {folderNames.map((folder) => (
              <FolderItem
                key={folder.id}
                folderName={folder.name}
                recipeCount={folder._count.recipes}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
