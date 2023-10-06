import SavedRecipesSection from "./SavedRecipesSection";
import { getUserRecipes } from "./loaders";

// const recipes: Recipe[] = [
//   {
//     name: 'Detroit Style',
//     ingredients: {
//       water: 100
//     },
//     folder: 'american pizzas'
//   },
//   {
//     name: 'New York Style',
//     ingredients: {
//       water: 100
//     },
//     folder: 'american pizzas'
//   },
//   {
//     name: 'Chicago Style',
//     ingredients: {
//       water: 100
//     },
//     folder: 'american pizzas'
//   },
//   {
//     name: 'Neapolitan Style',
//     ingredients: {
//       water: 100
//     },
//     folder: 'italian pizzas'
//   },
//   {
//     name: 'TMNT Style',
//     ingredients: {
//       water: 100
//     },
//     folder: undefined
//   }
// ]

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
