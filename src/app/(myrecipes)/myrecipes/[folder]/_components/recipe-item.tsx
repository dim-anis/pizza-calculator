import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/helpers";
import { Recipe } from "@prisma/client";
import Link from "next/link";

export default function RecipeItem({
  recipe,
  folderName,
}: {
  recipe: Recipe;
  folderName: string;
}) {
  return (
    <Link href={`/myrecipes/${folderName}/${recipe.id}`}>
      <li
        className={
          "-mx-2 flex cursor-pointer items-start justify-between rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
        }
      >
        <div>
          <h3 className="text-base">{recipe.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {formatDate(recipe.createdAt.toDateString())}
          </p>
        </div>
      </li>
    </Link>
  );
}

RecipeItem.Skeleton = function RecipeItemSkeleton() {
  return (
    <div className="-mx-2 p-2">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-1/5" />
        <Skeleton className="h-5 w-1/6" />
      </div>
    </div>
  );
};
