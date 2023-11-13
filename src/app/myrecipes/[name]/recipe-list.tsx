import { getAllRecipes, getFolderWithRecipes } from "./loaders";
import { toTitleCase } from "@/app/_utils/helpers";
import { Recipe } from "@prisma/client";
import RecipeItem from "./recipe-item";
import FolderEmptyView from "./recipe-empty-view";

export default async function RecipeList({
  folderName,
}: {
  folderName: string;
}) {
  let originalFolderName: string | undefined = toTitleCase(
    decodeURIComponent(folderName),
  );
  let recipes: Recipe[] | undefined = [];
  if (originalFolderName === "All") {
    recipes = await getAllRecipes();
  } else {
    const folder = await getFolderWithRecipes(originalFolderName);
    originalFolderName = folder?.name;
    recipes = folder?.recipes;
  }

  return (
    <div className="relative space-y-2 py-6 md:space-y-4 lg:gap-10 lg:py-10">
      <h2 className="text-2xl font-bold tracking-tight text-primary lg:text-3xl">
        {originalFolderName}
      </h2>
      {recipes?.length === 0 ? (
        <FolderEmptyView />
      ) : (
        <ul className="flex flex-col space-y-2">
          {recipes?.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              folderName={folderName}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
