import { Header } from '@/components/layout/header'
import { MainNavigation } from '@/components/layout/main-navigation'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function DashboardHeader() {
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