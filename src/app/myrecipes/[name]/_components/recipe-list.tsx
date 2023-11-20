import { getFolderWithRecipes } from "../loaders";
import { toTitleCase } from "@/app/_utils/helpers";
import RecipeItem from "./recipe-item";
import FolderEmptyView from "../folder-empty-view";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function RecipeList({
  folderName,
}: {
  folderName: string;
}) {
  let originalFolderName: string | undefined = toTitleCase(
    decodeURIComponent(folderName),
  );
  const folder = await getFolderWithRecipes(originalFolderName);
  originalFolderName = folder?.name;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-primary lg:text-3xl">
          {originalFolderName}
        </h2>
        <Link
          className={`${buttonVariants({
            variant: "default",
          })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
          href={`/myrecipes/${folderName}/new`}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add recipe
        </Link>
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
