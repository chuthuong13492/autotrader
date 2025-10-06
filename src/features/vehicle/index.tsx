import { VehicleHeader } from "./components/vehicle-header";
import { ALL_CARS } from '@/features/dashboard/data/mock-data'

import { Button } from '@/components/ui/button'
import { ArrowLeft} from 'lucide-react'
import { useNavigate, useParams } from '@tanstack/react-router'

export function VehicleDetailPage() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' })
    const navigate = useNavigate()
    
    // Find the vehicle by ID
    const vehicle = ALL_CARS.find(car => car.id === id)
    
    if (!vehicle) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
                    <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate({ to: '/search-result-page' })}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <VehicleHeader />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                <p className="text-xl text-blue-600 mb-4">${vehicle.price.toLocaleString()}</p>
                <p className="text-gray-600 mb-4">{vehicle.mileage.toLocaleString()} miles</p>
                <Button onClick={() => navigate({ to: '/search-result-page' })}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Search Results
                </Button>
            </div>
        </>
    )
}