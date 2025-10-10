import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonParagraph } from "@/components/ui/skeleton-paragraph";
import { cn } from "@/lib/utils";

export function VehicleCardLoading({ className } : { className?: string }) {
    return (
        <div
            className={cn(
                "w-64 flex flex-col rounded-md shadow bg-white mr-4",
                className
            )}
        >
            <Skeleton className="w-full h-40 object-cover rounded-t-md" />
            <div className="p-3 space-y-2 flex-1">
                <SkeletonParagraph className="text-sm" lines={1}/>
                <SkeletonParagraph className="text-lg" lines={1}/>
                <SkeletonParagraph className="text-sm" lines={1}/>
                <SkeletonParagraph className="text-lg" lines={1}/>
                <Skeleton className="h-[22px] w-24" />
            </div>
        </div>
    );
}