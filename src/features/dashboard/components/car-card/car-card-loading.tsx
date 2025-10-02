import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonParagraph } from "@/components/ui/skeleton-paragraph";

export function CarCardLoading() {
    return (
      <div className="rounded-md shadow">
           <Skeleton className="h-[306px] w-full rounded-md" />
            <div className="p-3">
                <SkeletonParagraph className="font-semibold" lines={1}/>

                <SkeletonParagraph className="text-xs mt-2" lines={1}/>

                <SkeletonParagraph className="mt-1 font-bold" lines={1}/>
            </div>
      </div>
    )
}
