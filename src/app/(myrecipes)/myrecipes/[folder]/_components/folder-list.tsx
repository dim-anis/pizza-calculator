import Link from "next/link";
import { getFolderNamesWithRecipeCount } from "../loaders";
import FolderItem from "./folder-list-item";
import { buttonVariants } from "@/components/ui/button";

export default async function FolderList() {
  const folderNames = await getFolderNamesWithRecipeCount();
  return (
    <>
      <Link
        href="/myrecipes/new-folder"
        className={`${buttonVariants({ variant: "outline" })}`}
      >
        Create new folder
      </Link>
      <nav>
        <ul className="flex flex-col space-y-1 lg:space-x-0">
          {folderNames.map((folder) => (
            <FolderItem
              key={folder.id}
              folderName={folder.name}
              recipeCount={folder._count.recipes}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
