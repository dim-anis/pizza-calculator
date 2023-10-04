'use client'

import FolderList from "./FolderList"
import RecipeSection from "./RecipeSection"
import { useState } from "react"
import { Prisma } from "@prisma/client"

const recipesWithFolders = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  include: { folder: true },
})

export type RecipesWithFolders = Prisma.RecipeGetPayload<typeof recipesWithFolders>;

type SavedRecipesSectionProps = {
  recipes: RecipesWithFolders[],
}

export default function SavedRecipesSection(props: SavedRecipesSectionProps) {
  const { recipes } = props;
  const [currFolder, setCurrFolder] = useState('all');
  function handleClick(name: string) {
    setCurrFolder(name);
  }

  const recipesGroupedByFolder = recipes.reduce((out: { [key: string]: RecipesWithFolders[] }, currRecipe) => {
    const folderName = currRecipe.folder.name;

    if (folderName !== undefined) {
      out[folderName]
        ? out[folderName].push(currRecipe)
        : out[folderName] = [currRecipe];
    }

    return out;
  }, {});

  recipesGroupedByFolder['all'] = recipes;

  return (
    <div className="mt-8">
      <h1 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900 ">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <FolderList recipes={recipes} folders={recipesGroupedByFolder} currFolder={currFolder} handleClick={handleClick} />
        <RecipeSection folders={recipesGroupedByFolder} currFolderName={currFolder} />
      </div>
    </div>
  )
}
