import { ALL_CARS } from "@/features/dashboard/data/mock-data";
import { useParams } from "@tanstack/react-router";
import { VehicleDetailForm } from "./vehicle-question-form";
import { VehiclePrice } from "./vehicle-info";

export function VehicleDetailSummary() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' })

    // Find the vehicle by ID
    const vehicle = ALL_CARS.find(car => car.id === id)

    return (
        <div className="col-span-1 lg:col-span-4 space-y-6">
            <VehiclePrice
                className="hidden lg:block"
                vehicle={vehicle}
            />
            <VehicleDetailForm />
        </div>
    )
}
