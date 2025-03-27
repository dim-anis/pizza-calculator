import Link from "next/link";
import { getFolderNamesWithRecipeCount } from "@/lib/queries";
import FolderItem from "./folder-list-item";
import { buttonVariants } from "@/components/ui/button";

export default async function FolderList() {
  const [foldersWithCount, totalRecipeCount] =
    await getFolderNamesWithRecipeCount();
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
          <FolderItem
            href={`/myrecipes`}
            folderName={"All recipes"}
            recipeCount={totalRecipeCount}
          />
          {foldersWithCount.map((folder) => (
            <FolderItem
              key={folder.id}
              href={`/myrecipes/${encodeURIComponent(folder.name)}`}
              folderName={folder.name}
              recipeCount={folder._count.recipes}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
