import SavedRecipesSection from "./SavedRecipesSection";
import { getUserRecipes } from "./loaders";

export default async function MyRecipes() {
  const recipes = await getUserRecipes();

  return <SavedRecipesSection recipeFolders={recipes} />;
}
