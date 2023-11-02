"use client";

import RecipeSection from "./RecipeSection";
import { useState } from "react";
import { Folder, Recipe } from "@prisma/client";
import { CreateFolderDialog } from "./CreateFolderDialog";
import Search from "@/components/Search";
import FolderListItem from "./FolderListItem";

export type AllRecipesFolder = Omit<
  RecipeFolder,
  "userId" | "createdAt" | "updatedAt"
>;

export type RecipeFolder = Folder & { recipes: Recipe[] };
export type SavedRecipesSectionProps = {
  recipeFolders: (RecipeFolder | AllRecipesFolder)[];
};

function flattenRecipes(
  folders: (RecipeFolder | AllRecipesFolder)[],
): Recipe[] {
  return folders.reduce(
    (acc, curr) => [...acc, ...curr.recipes],
    [] as Recipe[],
  );
}

export default function SavedRecipesSection({
  recipeFolders,
}: SavedRecipesSectionProps) {
  const [selectedFolder, setSelectedFolder] = useState("all");

  function handleFolderClick(name: string) {
    setSelectedFolder(name);
  }

  function handleUpdateFolderName(oldName: string, newName: string) {
    recipeFolders = [
      ...recipeFolders.map((folder) =>
        folder.name === oldName ? { ...folder, name: newName } : folder,
      ),
    ];
    if (selectedFolder === oldName) {
      setSelectedFolder(newName);
    }
  }

  function handleDeleteFolder(folderName: string) {
    recipeFolders = [
      ...recipeFolders.filter((folder) => folder.name !== folderName),
    ];
    if (selectedFolder === folderName) {
      setSelectedFolder("all");
    }
  }

  const filteredRecipes =
    selectedFolder === "all"
      ? flattenRecipes(recipeFolders)
      : recipeFolders.find((folder) => folder.name === selectedFolder)
          ?.recipes || [];

  return (
    <div className="mt-8">
      <h1 className="mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl">
        My Recipes
      </h1>
      <div className="mt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex flex-col space-y-4">
          <CreateFolderDialog />
          <Search recipes={flattenRecipes(recipeFolders)} />
          <ul className="mt-2 flex space-x-2 overflow-auto lg:flex-col lg:space-x-0 lg:space-y-1">
            {[
              { name: "all", id: "null", recipes: [] } as AllRecipesFolder,
              ...recipeFolders,
            ].map((folder) => (
              <FolderListItem
                key={folder.id}
                folder={folder}
                selected={selectedFolder === folder.name}
                handleClick={handleFolderClick}
              />
            ))}
          </ul>
        </div>
        <RecipeSection
          selectedFolder={selectedFolder}
          filteredRecipes={filteredRecipes}
          handleUpdateFolderName={handleUpdateFolderName}
          handleDeleteFolder={handleDeleteFolder}
        />
      </div>
    </div>
  );
}
