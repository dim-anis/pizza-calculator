"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FolderItem({
  folderName,
  recipeCount,
}: {
  folderName: string;
  recipeCount: number;
}) {
  const encodedFolderName = encodeURIComponent(folderName.toLowerCase());
  const href = `/myrecipes/${encodedFolderName}`;
  const currFolder = usePathname().split("/")[2];
  const isSelected = currFolder === encodedFolderName;
  return (
    <Link href={href}>
      <li
        className={`${
          isSelected
            ? "bg-muted hover:bg-muted"
            : "bg-transparent hover:bg-muted"
        } inline-flex h-9 w-full items-center justify-between rounded-md bg-muted px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
      >
        <span className="truncate">{folderName}</span>
        <span className="flex w-6 justify-center rounded-full bg-slate-200 px-2 py-1 text-xs">
          {recipeCount}
        </span>
      </li>
    </Link>
  );
}
