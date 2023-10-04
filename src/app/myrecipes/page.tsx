import { redirect } from "next/navigation";
import SavedRecipesSection from "./SavedRecipesSection";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getUserRecipes } from "./loaders";

export type Recipe = {
  name: string,
  ingredients: {
    water: number
  },
  folder: string | undefined
}

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
  return <SavedRecipesSection recipes={recipes} />
}
