import { CircleDot, Gauge, Car, Cog, Building2 } from "lucide-react";
import type { ALL_CARS } from "@/features/dashboard/data/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface VehicleInfoProps {
    vehicle: typeof ALL_CARS[0] | undefined;
    className?: string;
}

export function VehicleInfo({ vehicle, className }: VehicleInfoProps) {
    if (!vehicle) return null;

    const title = `${vehicle.condition} ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ' ' + vehicle.trim : ''}`;

    return (
        <div className={cn("pt-4 space-y-4", className)}>
            <VehicleTitle title={title} />
            <VehiclePrice className="lg:hidden" vehicle={vehicle} />
            <VehicleSpecs vehicle={vehicle} />
        </div>
    );
}

function VehicleTitle({ title }: { title: string }) {
    return (
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground/90">
            {title}
        </h1>
    );
}

export function VehiclePrice({ vehicle, className }: { vehicle?: typeof ALL_CARS[0], className?: string }) {
    return (
        <div className={cn(
            'w-full space-y-4',
            className
        )}>
            {(vehicle?.badges && vehicle?.badges.length > 0) &&
                <div className="flex flex-wrap gap-2">
                    {vehicle?.badges?.map((b, i) => (
                        <Badge key={i} variant="secondary" className="text-sm px-3 py-1">{b}</Badge>
                    ))}
                </div>
            }
            <div className="text-3xl font-bold text-foreground">${vehicle?.price.toLocaleString()}</div>
        </div>
    )
}

function VehicleSpecs({ vehicle }: { vehicle: typeof ALL_CARS[0] }) {
    return (
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Spec
                icon={<Gauge className="h-4 w-4" />}
                label="Mileage"
                value={`${vehicle.mileage.toLocaleString()} miles`}
            />
            <Spec
                icon={<Cog className="h-4 w-4" />}
                label="Transmission"
                value={vehicle.transmission}
            />
            <Spec
                icon={<Car className="h-4 w-4" />}
                label="Body Type"
                value={vehicle.bodyType}
            />
            <Spec
                icon={<CircleDot className="h-4 w-4" />}
                label="Condition"
                value={vehicle.condition}
            />
            <Spec
                icon={<Building2 className="h-4 w-4" />}
                label="Dealer"
                value={vehicle.dealer}
            />
        </div>
    );
}

function Spec({
    icon,
    label,
    value,
    className
}: {
    icon: React.ReactNode;
    label: string;
    value?: string | number;
    className?: string;
}) {
    return (
        <div className={cn("flex items-start gap-3 rounded-md border p-2", className)}>
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="font-medium">{value}</div>
            </div>
        </div>
    );
}
