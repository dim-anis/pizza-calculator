"use client";

import RecipeSection from "./RecipeSection";
import { useOptimistic, useState } from "react";
import { CreateFolderDialog } from "./CreateFolderDialog";
import Search from "@/components/Search";
import FolderListItem from "./FolderListItem";
import { DEFAULT_FOLDER_NAME } from "@/lib/constants";
import { AllRecipesFolder, RecipeFolder } from "@/lib/definitions";
import { flattenRecipes } from "./helpers";

type AddFolderAction = {
  type: "ADD_FOLDER";
  payload: { folder: Omit<RecipeFolder, "createdAt" | "updatedAt" | "userId"> };
};

type DeleteFolderAction = {
  type: "DELETE_FOLDER";
  payload: { folderName: string };
};

type UpdateFolderAction = {
  type: "UPDATE_FOLDER";
  payload: { oldName: string; newName: string };
};

type RecipeFolderAction =
  | AddFolderAction
  | DeleteFolderAction
  | UpdateFolderAction;

type SavedRecipesSectionProps = {
  recipeFolders: (RecipeFolder | AllRecipesFolder)[];
};

const allRecipesFolder: AllRecipesFolder = {
  name: DEFAULT_FOLDER_NAME,
  id: crypto.randomUUID(),
  recipes: [],
};

function reducer(
  state: (AllRecipesFolder | RecipeFolder)[],
  action: RecipeFolderAction,
) {
  switch (action.type) {
    case "ADD_FOLDER":
      return [...state, action.payload.folder];
    case "DELETE_FOLDER":
      return state.filter(
        (folder) => folder.name !== action.payload.folderName,
      );
    case "UPDATE_FOLDER":
      return [
        ...state.map((folder) =>
          folder.name === action.payload.oldName
            ? { ...folder, name: action.payload.newName }
            : folder,
        ),
      ];
    default:
      return state;
  }
}

export default function SavedRecipesSection({
  recipeFolders,
}: SavedRecipesSectionProps) {
  const [selectedFolder, setSelectedFolder] = useState(DEFAULT_FOLDER_NAME);
  const [optimisticRecipeFolders, optimisticDispatch] = useOptimistic(
    recipeFolders,
    reducer,
  );

  function handleFolderClick(name: string) {
    setSelectedFolder(name);
  }

  function handleCreateFolder(folderName: string) {
    setSelectedFolder(folderName);
    const folder = {
      name: folderName,
      id: crypto.randomUUID(),
      recipes: [],
    };
    optimisticDispatch({
      type: "ADD_FOLDER",
      payload: {
        folder,
      },
    });
  }

  function handleUpdateFolderName(oldName: string, newName: string) {
    optimisticDispatch({
      type: "UPDATE_FOLDER",
      payload: {
        oldName,
        newName,
      },
    });
    if (selectedFolder === oldName) {
      setSelectedFolder(newName);
    }
  }

  function handleDeleteFolder(folderName: string) {
    if (selectedFolder === folderName) {
      setSelectedFolder(DEFAULT_FOLDER_NAME);
    }

    optimisticDispatch({
      type: "DELETE_FOLDER",
      payload: {
        folderName,
      },
    });
  }

  const filteredRecipes =
    selectedFolder === DEFAULT_FOLDER_NAME
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
          <CreateFolderDialog handleCreateFolder={handleCreateFolder} />
          <Search recipes={flattenRecipes(recipeFolders)} />
          <ul className="mt-2 flex space-x-2 overflow-auto lg:flex-col lg:space-x-0 lg:space-y-1">
            {[allRecipesFolder, ...optimisticRecipeFolders].map((folder) => (
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
