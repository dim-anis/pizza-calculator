import { Skeleton } from "@/components/ui/skeleton";
import { RecipeToolbar } from "../../_components/toolbar";

export default async function RecipePageLoading() {
  return (
    <div className="flex h-full flex-col items-start justify-start space-y-4">
      <RecipeToolbar />
      <div className="h-full w-full space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-8 w-2/5" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-[64px] rounded-md px-3" />
            <Skeleton className="h-6 w-[64px] rounded-md px-3" />
            <Skeleton className="h-6 w-[64px] rounded-md px-3" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex w-full flex-col space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
            </div>
            <div className="flex flex-col items-start justify-between gap-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
