import ChangeFolderNameDialog from "./ChangeFolderNameDialog";
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";
import { RecipeFolder } from "./SavedRecipesSection";

type RecipeSectionProps = {
  currFolder: RecipeFolder | undefined;
};

export default function RecipeSection({ currFolder }: RecipeSectionProps) {
  const numOfRecipes = currFolder?.recipes.length;
  const isEmptyFolder = numOfRecipes === 0;

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="mb-5 flex items-center gap-1">
        {currFolder?.name !== "all" && (
          <ChangeFolderNameDialog currFolder={currFolder} />
        )}
        <h2 className="font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">
          {`${currFolder?.name} (${numOfRecipes})`}
        </h2>
      </div>
      {isEmptyFolder ? (
        <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
      ) : (
        <RecipeList>
          {currFolder?.recipes.map((recipe) => (
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
