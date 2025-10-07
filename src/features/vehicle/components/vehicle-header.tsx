import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { MainNavigation } from '@/components/layout/main-navigation'

export function VehicleHeader() {
  return (
    <Header>
      {/* MAIN NAVIGATION */}
      <MainNavigation className='hidden @[1300px]:flex' />
      {/* PROFILE */}
      <div className='ms-auto flex items-center space-x-4'>
        <ProfileDropdown />
      </div>
    </Header>
  )
}