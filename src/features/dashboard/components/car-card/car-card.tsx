import { BaseImage } from "@/components/ui/base-image"
import { type Car } from "../../data/mock-data"
import { cn } from "@/lib/utils"
import { useNavigate } from '@tanstack/react-router'

interface CarCardProps {
    car: Car,
    className?: string
}

export function CarCard({ car, className }: CarCardProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate({ 
            to: '/vehicle/$id', 
            params: { id: car.id },
        })
    }

    return (
        <div 
            className={cn(
                "rounded-md shadow hover:shadow-md cursor-pointer transition-all duration-300 ease-out",
                className,
            )}
            onClick={handleClick}
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

