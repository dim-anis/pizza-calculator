'use client'

import Search from "@/components/Search"
import { Button } from "@/components/ui/button"
import { RecipesWithFolders } from "./SavedRecipesSection"

type FolderListProps = {
  recipes: RecipesWithFolders[],
  folders: { [key: string]: RecipesWithFolders[] },
  currFolder: string,
  handleClick: (name: string) => void
}

export default function FolderList(props: FolderListProps) {
  const { folders, currFolder, handleClick, recipes } = props;

  return (
    <aside className="space-y-4 flex flex-col">
      <Button variant='secondary'>Create new folder</Button>
      <Search recipes={recipes} />
      <ul className="mt-2 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {
          Object.keys(folders).map(folderName => (
            <li
              className={`${currFolder === folderName ? 'bg-muted hover:bg-muted' : 'bg-transparent hover:underline'} items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start`}
              role='tablist'
              key={folderName}
            >
              <button onClick={() => handleClick(folderName)}>
                {folderName}
              </button>
            </li>
          ))
        }
      </ul>
    </aside>
  )
}
