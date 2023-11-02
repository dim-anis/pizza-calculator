import { Recipe } from "@prisma/client";
import ChangeFolderNameDialog from "./ChangeFolderNameDialog";
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";

type RecipeSectionProps = {
  filteredRecipes: Recipe[];
  selectedFolder: string;
  handleUpdateFolderName: (oldName: string, newName: string) => void;
  handleDeleteFolder: (folderName: string) => void;
};

export default function RecipeSection({
  filteredRecipes,
  selectedFolder,
  handleUpdateFolderName,
  handleDeleteFolder,
}: RecipeSectionProps) {
  const numOfRecipes = filteredRecipes.length;
  const isEmptyFolder = numOfRecipes === 0;

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="mb-5 flex items-center gap-1">
        {selectedFolder !== "all" && (
          <ChangeFolderNameDialog
            folderName={selectedFolder}
            handleUpdateFolderName={handleUpdateFolderName}
            handleDeleteFolder={handleDeleteFolder}
          />
        )}
        <h2 className="font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">
          {`${selectedFolder} (${numOfRecipes})`}
        </h2>
      </div>
      {isEmptyFolder ? (
        <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
      ) : (
        <RecipeList>
          {filteredRecipes.map((recipe) => (
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
