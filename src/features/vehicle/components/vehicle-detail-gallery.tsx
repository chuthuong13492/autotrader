import { BaseImage } from "@/components/ui/base-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ALL_CARS, IMG } from "@/features/dashboard/data/mock-data";
import { cn } from "@/lib/utils";
import { useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { VehicleInfo } from "./vehicle-info";

export function VehicleDetailGallery() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' });
    const vehicle = ALL_CARS.find(car => car.id === id);
    const [activeIndex, setActiveIndex] = useState(0);

    const gallery = useMemo(() => {
        const baseSeed = Number(vehicle?.id ?? 1) || 1;
        const main = vehicle?.imageUrl ?? IMG(baseSeed);
        const thumbs = Array.from({ length: 8 }).map((_, idx) =>
            IMG(baseSeed + idx + 1)
        );
        return [main, ...thumbs];
    }, [vehicle?.id, vehicle?.imageUrl]);

    return (
        <div className="col-span-1 lg:col-span-8">
            <MainImage 
                src={gallery[activeIndex]} 
                alt={`${vehicle?.make} ${vehicle?.model}`} 
            />
            
            <ThumbnailGallery 
                gallery={gallery}
                activeIndex={activeIndex}
                onThumbnailClick={setActiveIndex}
            />

            {/* Vehicle Info */}
            <VehicleInfo 
                vehicle={vehicle} 
            />
        </div>
    );
}

function MainImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="rounded-md overflow-hidden">
            <BaseImage 
                src={src} 
                alt={alt} 
                className="aspect-[16/8] rounded-md" 
            />
        </div>
    );
}

function ThumbnailGallery({ 
    gallery, 
    activeIndex, 
    onThumbnailClick 
}: { 
    gallery: string[]; 
    activeIndex: number; 
    onThumbnailClick: (index: number) => void; 
}) {
    return (
        <ScrollArea orientation="horizontal" className="w-full py-2">
            <div className="flex gap-2 w-max p-1">
                {gallery.map((url, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onThumbnailClick(i)}
                        className={cn(
                            "relative rounded-md overflow-hidden border cursor-pointer",
                            i === activeIndex 
                                ? "ring-2 ring-primary border-transparent" 
                                : "border-transparent"
                        )}
                    >
                        <BaseImage 
                            src={url} 
                            alt={`thumb-${i + 1}`} 
                            className="aspect-[3/2] h-20" 
                        />
                    </button>
                ))}
            </div>
        </ScrollArea>
    );
}