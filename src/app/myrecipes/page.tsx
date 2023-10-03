'use client'

import Search from "@/components/Search";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import FolderList from "./FolderList";
import RecipeSection from "./RecipeSection";
import { useState } from "react";

export type Recipe = {
  name: string,
  ingredients: {
    water: number
  },
  folder: string | undefined
}

const recipes: Recipe[] = [
  {
    name: 'Detroit Style',
    ingredients: {
      water: 100
    },
    folder: 'american pizzas'
  },
  {
    name: 'New York Style',
    ingredients: {
      water: 100
    },
    folder: 'american pizzas'
  },
  {
    name: 'Chicago Style',
    ingredients: {
      water: 100
    },
    folder: 'american pizzas'
  },
  {
    name: 'Neapolitan Style',
    ingredients: {
      water: 100
    },
    folder: 'italian pizzas'
  },
  {
    name: 'TMNT Style',
    ingredients: {
      water: 100
    },
    folder: undefined
  }
]

const recipesGroupedByFolder = recipes.reduce((out: { [key: string]: Recipe[] }, currRecipe) => {
  const folderName = currRecipe.folder;

  if (folderName !== undefined) {
    out[folderName]
      ? out[folderName].push(currRecipe)
      : out[folderName] = [currRecipe];
  }

  return out;
}, {});

recipesGroupedByFolder['all'] = recipes;

export default function MyRecipes() {
  // const session = await getServerSession();
  //
  // if (!session || !session.user) {
  //   redirect('/api/auth/signin');
  // }

  const [currFolder, setCurrFolder] = useState('all');
  function handleClick(name: string) {
    setCurrFolder(name);
  }

  return (
    <div className="mt-8">
      <h1 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900 ">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="space-y-4">
          <Search recipes={recipes} />
          <FolderList folders={recipesGroupedByFolder} currFolder={currFolder} handleClick={handleClick} />
        </aside>
        <RecipeSection folders={recipesGroupedByFolder} currFolderName={currFolder} />
      </div>
    </div>
  )
}
