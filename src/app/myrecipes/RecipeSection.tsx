import { Recipe } from "@prisma/client";
import RecipeItem from "./RecipeItem";
import RecipeList from "./RecipeList";

type RecipeSectionProps = {
  currFolder: {
    name: string,
    contents: Recipe[]
  },
}

export default function RecipeSection(props: RecipeSectionProps) {
  const { currFolder: { name: folderName, contents: folderContents } } = props;
  const numOfRecipes = folderContents.length;

  return (
    <div>
      <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900">{folderName || "All"} ({numOfRecipes})</h2>
      {
        numOfRecipes === 0 ? (
          <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
        ) : (
          <RecipeList>
            {
              folderContents.map(recipe => (
                <RecipeItem key={recipe.name.toLowerCase()} name={recipe.name} desc={'short desc...'}></RecipeItem>
              ))
            }
          </RecipeList>
        )}
    </div>
  )
}
