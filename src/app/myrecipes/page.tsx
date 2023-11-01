import SavedRecipesSection from "./SavedRecipesSection";
import { getRecipesGroupedByFolder } from "./loaders";

export default async function MyRecipes() {
  const recipes = await getRecipesGroupedByFolder();

  return <SavedRecipesSection recipeFolders={recipes} />;
}
