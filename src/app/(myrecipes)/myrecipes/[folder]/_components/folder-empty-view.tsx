import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function FolderEmptyView({}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="file" />
      <EmptyPlaceholder.Title>No recipes found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any recipes in this folder yet.
      </EmptyPlaceholder.Description>
      <Link
        className={`${buttonVariants({
          variant: "default",
        })} inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
        href={`/myrecipes/${folderName}/new-recipe`}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add recipe
      </Link>
    </EmptyPlaceholder>
  );
}
