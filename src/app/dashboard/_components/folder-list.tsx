"use client";
import SidebarItem from "./sidebar-item";
import { FolderWithCount } from "@/lib/types";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  folders: FolderWithCount[];
};

export default function FolderList({ folders }: Props) {
  const path = usePathname();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-muted-foreground px-4">
          My folders
        </h3>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/dashboard/folders/new`}
                className={`${buttonVariants({ size: "icon", variant: "ghost" })} ml-auto rounded-full`}
              >
                <Icons.add className="text-muted-foreground" />
                <span className="sr-only">New folder</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>New folder</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul className="flex flex-col space-y-1 lg:space-x-0 mt-2">
        {folders.map((folder) => {
          const href = `/dashboard/folders/${folder.id}`;
          return (
            <Link key={folder.id} href={href}>
              <SidebarItem
                isActive={href === path}
                key={folder.id}
                title={folder.name}
                left={
                  <Icons.folder className="h-4 w-4 mr-2 text-muted-foreground" />
                }
                right={
                  <span
                    className={`${href === path ? "" : "text-muted-foreground"} ml-2`}
                    aria-hidden={true}
                  >
                    {folder._count.recipes}
                  </span>
                }
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
