import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb'
import { useParams } from '@tanstack/react-router'
import { ALL_CARS } from '@/features/dashboard/data/mock-data'

export function VehicleHeader() {
  const { id } = useParams({ from: '/_dashboard/vehicle/$id' })

  
  // Find the vehicle by ID
  const vehicle = ALL_CARS.find(car => car.id === id)

  return (
    <Header>
      <DynamicBreadcrumb 
        lastItem={{
          label: `${vehicle?.make} ${vehicle?.model}`,
          href: undefined
        }}
      />
      
      <div className='ms-auto flex items-center space-x-4'>
        <ProfileDropdown />
      </div>
    </Header>
  )
}