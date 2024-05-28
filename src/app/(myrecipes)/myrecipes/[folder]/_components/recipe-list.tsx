import { getFolderWithRecipes } from "@/lib/queries";
import RecipeItem from "./recipe-item";
import FolderTitleToolbar from "./folder-toolbar";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Empty from "@/components/empty";

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
        <Empty
          title={"No recipes found"}
          description={"You don't have any recipes in this folder yet."}
        >
          <Link
            className={`${buttonVariants({
              variant: "default",
            })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
            href={`/myrecipes/${folderName}/new-recipe`}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            Add recipe
          </Link>
        </Empty>
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
