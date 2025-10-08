import { BaseImage } from "@/components/ui/base-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Car } from "@/features/dashboard/data/mock-data";

interface VehicleCardProps {
    car: Car;
    location?: string;
    isAdCard?: boolean;
    adContent?: {
        title: string;
        description: string;
        imageUrl: string;
    };
    className?: string;
}

export function VehicleCard({
    car,
    className
}: VehicleCardProps) {
    const formatMileage = (mileage: number) => {
        if (mileage >= 1000) {
            return `${Math.floor(mileage / 1000)}K mi`;
        }
        return `${mileage} mi`;
    };

    const getPriceTag = (price: number) => {
        if (price < 25000) return "Great Price";
        if (price < 30000) return "Good Price";
        return "Fair Price";
    };

    const isHybrid = car.badges?.includes("Hybrid") || car.badges?.includes("Electric");

    return (
        <div
            className={cn(
                "w-64 flex flex-col rounded-md shadow hover:shadow-md cursor-pointer transition-all duration-300 ease-out bg-white",
                className,
            )}
        >
            {/* Car Image */}
            <BaseImage
                src={car.imageUrl}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-40 object-cover rounded-t-md"
            />
            {/* Car Details */}
            <div className="p-3 space-y-2 flex-1">
                <div className="text-muted-foreground text-sm">Certified</div>
                <div className="font-bold text-lg">{car.year} {car.make} {car.model}</div>
                <div className="text-sm text-muted-foreground">
                    {car.trim} • {formatMileage(car.mileage)}
                    {isHybrid && <span className="ml-1">🌿 Hybrid</span>}
                </div>
                <div className="font-bold text-lg">${car.price.toLocaleString()}</div>
                <Badge className="bg-green-600 text-white">
                    {getPriceTag(car.price)}
                </Badge>
            </div>
        </div>
    );
}
