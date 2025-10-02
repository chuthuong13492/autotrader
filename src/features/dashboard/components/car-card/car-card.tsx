import { BaseImage } from "@/components/ui/base-image"
import { type Car } from "../../data/mock-data"
import { cn } from "@/lib/utils"

interface CarCardProps {
    car: Car,
    className?: string
}

export function CarCard({ car, className }: CarCardProps) {
    return (
        <div className={cn(
            "rounded-md shadow transition-transform duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] cursor-pointer",
            className,
        )}>
            <BaseImage src={car.imageUrl} alt={`${car.make} ${car.model}`} className="aspect-[408/306] rounded-md" />
            <div className="p-3">
                <div className={cn('font-semibold')}>{car.year} {car.make} {car.model}</div>
                <div className="text-sm text-muted-foreground">{car.trim} • {car.mileage.toLocaleString()} mi</div>
                <div className="mt-1 font-bold">${car.price.toLocaleString()}</div>
            </div>
        </div>
    )
}

