import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { ALL_CARS } from "@/features/dashboard/data/mock-data";
import { useParams } from "@tanstack/react-router";


export function VehicleBreadcrumb() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' })

    // Find the vehicle by ID
    const vehicle = ALL_CARS.find(car => car.id === id)
    return (
        <div className='pl-2 flex items-center justify-between'>
            <DynamicBreadcrumb lastItem={{ label: `${vehicle?.make} ${vehicle?.model}` }} />
        </div>
    )
}