import { Skeleton } from "./ui/skeleton";

export function EditorSkeleton() {
  return (
    <div className="w-full h-full pl-2.5 space-y-1">
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="h-[18px] w-1/3 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-6 h-[18px] w-1/6 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-6 h-[18px] w-1/6 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-6 h-[18px] w-3/5 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-12 h-[18px] w-1/6 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-12 h-[18px] w-1/3 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-12 h-[18px] w-2/5 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-12 h-[18px] w-1/12 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-12 h-[18px] w-1/5 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="ml-6 h-[18px] w-1/6 rounded" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="h-[18px] w-1/12 rounded" />
      </div>
    </div>
  );
}
