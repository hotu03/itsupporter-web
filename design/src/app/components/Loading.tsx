import { Skeleton } from "./ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 p-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
