"use client";

import RecipeSection from "./RecipeSection";
import { useEffect, useState } from "react";
import { Folder, Recipe } from "@prisma/client";
import { CreateFolderDialog } from "./CreateFolderDialog";
import Search from "@/components/Search";
import FolderListItem from "./FolderListItem";

export type RecipeFolder = Folder & { recipes: Recipe[] };
export type SavedRecipesSectionProps = {
  recipeFolders: RecipeFolder[];
};

export default function SavedRecipesSection({
  recipeFolders,
}: SavedRecipesSectionProps) {
  const allRecipesFolder = recipeFolders.find(
    (folder) => folder.name === "all",
  )!;
  const [currFolder, setCurrFolder] = useState<RecipeFolder | undefined>(
    allRecipesFolder,
  );

  // reset currFolder on server action revalidate
  useEffect(() => {
    const folder = recipeFolders.find((folder) => folder.id === currFolder?.id);
    if (folder) {
      setCurrFolder(folder);
    } else {
      const allRecipesFolder = recipeFolders.find(
        (folder) => folder.name === "all",
      );
      setCurrFolder(allRecipesFolder);
    }
  }, [recipeFolders, currFolder]);

  const foldersWithoutAll = recipeFolders.filter(
    (folder) => folder.name !== allRecipesFolder.name,
  );
  const sortedFolders = [allRecipesFolder, ...foldersWithoutAll];

  function handleClick(folderId: string) {
    const folder = recipeFolders.find((folder) => folder.id === folderId);
    setCurrFolder(folder);
  }

  return (
    <div className="mt-8">
      <h1 className="mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex flex-col space-y-4">
          <CreateFolderDialog />
          <Search recipes={sortedFolders[0].recipes} />
          <ul className="mt-2 flex space-x-2 overflow-auto lg:flex-col lg:space-x-0 lg:space-y-1">
            {sortedFolders.map((folder) => (
              <FolderListItem
                key={folder.id}
                folder={folder}
                currFolder={currFolder}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </div>
        <RecipeSection currFolder={currFolder} />
      </div>
    </div>
  );
}
