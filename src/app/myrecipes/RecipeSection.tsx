import ChangeFolderNameDialog from "./ChangeFolderNameDialog";
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";
import { RecipeFolder } from "./SavedRecipesSection";

type RecipeSectionProps = {
  currFolder: RecipeFolder | null;
};

export default function RecipeSection({ currFolder }: RecipeSectionProps) {
  if (!currFolder) return;

  const numOfRecipes = currFolder.recipes.length;
  const isEmptyFolder = numOfRecipes === 0;

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="flex gap-1">
        {currFolder.name !== "all" ? (
          <ChangeFolderNameDialog currFolder={currFolder} />
        ) : null}
        <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900">
          {`${currFolder.name} (${numOfRecipes})`}
        </h2>
      </div>
      {isEmptyFolder ? (
        <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
      ) : (
        <RecipeList>
          {currFolder.recipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              name={recipe.name}
              desc={"short description..."}
            />
          ))}
        </RecipeList>
      )}
    </div>
  );
}
