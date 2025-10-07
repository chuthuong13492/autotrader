import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { Main } from "@/components/layout/main";
import { ALL_CARS } from "@/features/dashboard/data/mock-data";
import {  useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BaseImage } from "@/components/ui/base-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CircleDot, Gauge, Car, Cog, Building2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";


export function VehicleMain() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' })
    
    // Find the vehicle by ID
    const vehicle = ALL_CARS.find(car => car.id === id)
    const title = useMemo(() => {
        if (!vehicle) return ''
        return `${vehicle.condition} ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ' ' + vehicle.trim : ''}`
    }, [vehicle])

    // Build gallery: first image is the main one from data, plus 5 variants based on id
    const gallery = useMemo(() => {
        const baseSeed = Number(vehicle?.id ?? 1) || 1
        const main = vehicle?.imageUrl ?? `https://picsum.photos/seed/car-${baseSeed}/800/500`
        const thumbs = Array.from({ length: 5 }).map((_, idx) =>
            `https://picsum.photos/seed/car-${baseSeed}-${idx + 1}/800/500`
        )
        return [main, ...thumbs]
    }, [vehicle?.id, vehicle?.imageUrl])

    const [activeIndex, setActiveIndex] = useState(0)

    if (!vehicle) {
        return (
            <Main className="px-2">
                <div className='pl-2 mb-4 flex items-center justify-between space-y-2'>
                    <DynamicBreadcrumb lastItem={{label: 'Vehicle not found'}}/>
                </div>
                <div className="pl-2">Không tìm thấy xe.</div>
            </Main>
        )
    }

    return (
        <Main className="px-2">
            <div className='pl-2 mb-4 flex items-center justify-between space-y-2'>
                <DynamicBreadcrumb lastItem={{label: `${vehicle.make} ${vehicle.model}`}}/>
            </div>
            <div className="pl-2 flex w-full">
                <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-12">
                    {/* Gallery */}
                    <div className="col-span-1 lg:col-span-8">
                        <div className="rounded-md overflow-hidden">
                            <BaseImage src={gallery[activeIndex]} alt={`${vehicle.make} ${vehicle.model}`} className="aspect-[16/10] rounded-md" />
                        </div>
                        <div className="mt-2">
                            <ScrollArea orientation="horizontal" className="w-full">
                                <div className="flex gap-2 w-max pr-2">
                                    {gallery.map((url, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setActiveIndex(i)}
                                            className={cn(
                                                "relative rounded-md overflow-hidden border cursor-pointer",
                                                i === activeIndex ? "ring-2 ring-primary border-transparent" : "border-transparent"
                                            )}
                                        >
                                            <BaseImage src={url} alt={`thumb-${i + 1}`} className="aspect-[4/3] w-[160px]" />
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="col-span-1 lg:col-span-4">
                        <div className="flex items-start justify-between">
                            <h1 className="text-2xl font-extrabold tracking-tight text-foreground/90">{title}</h1>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {vehicle.badges?.map((b, i) => (
                                <Badge key={i} variant="secondary">{b}</Badge>
                            ))}
                        </div>
                        <div className="mt-4 text-3xl font-bold text-foreground">${vehicle.price.toLocaleString()}</div>

                        {/* Specs */}
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Spec icon={<Gauge className="h-4 w-4" />} label="Mileage" value={`${vehicle.mileage.toLocaleString()} miles`} />
                            <Spec icon={<Cog className="h-4 w-4" />} label="Transmission" value={vehicle.transmission} />
                            <Spec icon={<Car className="h-4 w-4" />} label="Body Type" value={vehicle.bodyType} />
                            <Spec icon={<CircleDot className="h-4 w-4" />} label="Condition" value={vehicle.condition} />
                            <Spec icon={<Building2 className="h-4 w-4" />} label="Dealer" value={vehicle.dealer} />
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

function Spec({ icon, label, value, className }: { icon: React.ReactNode, label: string, value: string | number, className?: string }) {
    return (
        <div className={cn("flex items-start gap-3 rounded-md border p-3", className)}>
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="font-medium">{value}</div>
            </div>
        </div>
    )
}