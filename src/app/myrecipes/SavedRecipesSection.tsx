"use client";

import FolderList from "./FolderList";
import RecipeSection from "./RecipeSection";
import { useState } from "react";
import { Folder, Recipe } from "@prisma/client";

export type RecipeFolder = Folder & { recipes: Recipe[] };
export type SavedRecipesSectionProps = {
  recipeFolders: RecipeFolder[];
};

export default function SavedRecipesSection({
  recipeFolders,
}: SavedRecipesSectionProps) {
  const allRecipesFolder =
    recipeFolders.find((folder) => folder.name === "all") || null;
  const [currFolder, setCurrFolder] = useState<RecipeFolder | null>(
    allRecipesFolder,
  );

  function handleClick(name: string) {
    const folder = recipeFolders.find((folder) => folder.name === name) || null;
    setCurrFolder(folder);
  }

  return (
    <div className="mt-8">
      <h1 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <FolderList
          folders={recipeFolders}
          currFolder={currFolder}
          handleClick={handleClick}
        />
        <RecipeSection currFolder={currFolder} />
      </div>
    </div>
  );
}
