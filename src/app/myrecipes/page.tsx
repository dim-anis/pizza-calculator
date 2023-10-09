import SavedRecipesSection from "./SavedRecipesSection";
import { getUserRecipes } from "./loaders";

export default async function MyRecipes() {
  const recipes = await getUserRecipes();

  const transformedUserRecipes = recipes.map((userRecipe) => {
    const { id, createdAt, updatedAt, name, userId, recipes } = userRecipe;
    const extractedRecipes = recipes.map((recipeItem) => recipeItem.recipe);

    return {
      id,
      createdAt,
      updatedAt,
      name,
      userId,
      recipes: extractedRecipes,
    };
  })

  return <SavedRecipesSection recipeFolders={transformedUserRecipes} />
}
