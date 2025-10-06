import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonParagraph } from "@/components/ui/skeleton-paragraph"

export function FilterLoading() {
    return (
        <div className="space-y-3 p-4">
            <SkeletonParagraph className="text-sm font-medium" lines={1}/>
            <Skeleton className='h-8 w-full rounded-md'/>
        </div>
    )
}