import { BaseImage } from "@/components/ui/base-image"
import { type Car } from "../../data/mock-data"
import { cn } from "@/lib/utils"

interface CarCardProps {
    car: Car,
    className?: string
}

export function SuggestionCard({ car, className }: CarCardProps) {
    return (
        <div
            className={cn(
                "rounded-md shadow hover:shadow-md cursor-pointer transition-all duration-300 ease-out",
                className,
            )}
        >
            <BaseImage src={car.imageUrl} alt={`${car.make} ${car.model}`} className="aspect-[408/306] rounded-md" />
            <div className="p-3">
                <div className={cn('font-semibold')}>{car.year} {car.make} {car.model}</div>
                <div className="text-sm text-muted-foreground">{car.trim} • {car.mileage.toLocaleString()} mi</div>
                <div className="mt-1 font-bold">${car.price.toLocaleString()}</div>
            </div>
        </div>
    )
}

