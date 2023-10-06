'use client'

import FolderList from "./FolderList"
import RecipeSection from "./RecipeSection"
import { useState } from "react"
import { Folder, Recipe } from "@prisma/client"

export type RecipeFolder = Folder & { recipes: Recipe[] }
export type CurrFolder = {
  name: string,
  contents: Recipe[]
}
export type SavedRecipesSectionProps = {
  recipeFolders: RecipeFolder[],
}

export default function SavedRecipesSection(props: SavedRecipesSectionProps) {
  const { recipeFolders } = props;

  const [currFolder, setCurrFolder] = useState<CurrFolder>({
    name: 'all',
    contents: recipeFolders.find(folder => folder.name === 'all')?.recipes || []
  });

  function handleClick(name: string) {
    setCurrFolder({
      name: name,
      contents: recipeFolders.find(folder => folder.name === name)?.recipes || []
    });
  }

  return (
    <div className="mt-8">
      <h1 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <FolderList folders={recipeFolders} currFolder={currFolder} handleClick={handleClick} />
        <RecipeSection currFolder={currFolder} />
      </div>
    </div>
  )
}
