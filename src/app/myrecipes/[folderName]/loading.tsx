import { Skeleton } from "@/components/ui/skeleton";
import RecipeItem from "./_components/recipe-item";

export default async function FolderPageLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/5" />
        <Skeleton className="h-8 w-1/6" />
      </div>
      <ul className="flex flex-col space-y-2">
        <RecipeItem.Skeleton />
        <RecipeItem.Skeleton />
        <RecipeItem.Skeleton />
        <RecipeItem.Skeleton />
        <RecipeItem.Skeleton />
      </ul>
    </>
  );
}
