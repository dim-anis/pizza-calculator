'use client'

import { PlusSquare } from "lucide-react"
import { Recipe } from "./page"
import { Separator } from "@/components/ui/separator"

type FolderListProps = {
  folders: { [key: string]: Recipe[] },
  currFolder: string,
  handleClick: (name: string) => void
}

export default function FolderList(props: FolderListProps) {

  return (
    <div>
      <button className="mb-3 flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start">
        <PlusSquare />
        Create new folder
      </button>
      <Separator />
      <ul className="mt-2 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {
          Object.keys(props.folders).map(folderName => (
            <li
              className={`${props.currFolder === folderName ? 'bg-muted hover:bg-muted' : 'bg-transparent hover:underline'} items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start`}
              role='tablist'
              key={folderName}
            >
              <button onClick={() => props.handleClick(folderName)}>
                {folderName}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
