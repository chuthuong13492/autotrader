import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function DashboardHeader(){
    return (
        <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>
    )
}