import { Outlet } from '@tanstack/react-router'
import { DashboardProvider } from '@/features/dashboard/dashboard-provider'
import { SearchProvider } from '@/context/search-provider'
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header'
import { Footer } from './footer'
export function DashboardLayout() {

  return (
    <DashboardProvider >
      <SearchProvider >
        <div className='@container/content min-h-svh'>
          <DashboardHeader />
          <Outlet />
        </div>
        <Footer />
      </SearchProvider>
    </DashboardProvider>
  )
}
