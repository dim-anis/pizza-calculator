import { Skeleton } from "@/components/ui/skeleton";

export default function CreateRecipeLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/5" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <Skeleton className="h-6 w-1/6" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-1/6" />
      </div>
    </div>
  );
}
