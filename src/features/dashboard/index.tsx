import { DashboardBadge } from './components/dashboard-badge'
import { Footer } from '@/components/layout/footer'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardMain } from './components/dashboard-main'

export function Dashboard() {
  return (
    <>
    <DashboardHeader />
    <DashboardBadge />
    <DashboardMain />
    <Footer />
  </>
  )
}

