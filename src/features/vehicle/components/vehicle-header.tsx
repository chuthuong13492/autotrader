import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb'

export function VehicleHeader() {
  return (
    <Header>
      <DynamicBreadcrumb 
        lastItem={{
          label: 'Vehicle Details',
          href: undefined
        }}
      />
      
      <div className='ms-auto flex items-center space-x-4'>
        <ProfileDropdown />
      </div>
    </Header>
  )
}