import { DashboardBadge } from './components/dashboard-badge'
import { Footer } from '@/components/layout/footer'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardMain } from './components/dashboard-main'
import { SearchProvider } from '@/context/search-provider'
import { DashboardDataLoader } from './dashboard-provider'


export function Dashboard() {
  return (
    <DashboardDataLoader>
      <SearchProvider>
        <DashboardHeader />
        <DashboardBadge />
        <DashboardMain />
        <Footer />
      </SearchProvider>
    </DashboardDataLoader>
  )
}

