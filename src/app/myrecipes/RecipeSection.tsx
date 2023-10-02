import { Recipe } from "./page"

type RecipeSectionProps = {
  currFolderName: string,
  folders: { [key: string]: Recipe[] },
}

export default function RecipeSection(props: RecipeSectionProps) {
  const { folders, currFolderName } = props;

  const numOfRecipes = folders[currFolderName].length;

  return (
    <div>
      <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 ">{props.currFolderName} ({numOfRecipes})</h2>
      {
        numOfRecipes === 0 ? (
          <p>You don&apos;t have any saved recipes yet. Get cooking!</p>
        ) : (
          <ul>
            {
              folders[currFolderName].map(recipe => (
                <li key={recipe.name.toLowerCase()}>{recipe.name}</li>
              ))
            }
          </ul>
        )}
    </div>
  )
}
