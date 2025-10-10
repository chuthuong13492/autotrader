import { memo } from 'react'
import { DashboardBadge } from './components/dashboard-badge'
import { DashboardMain } from './components/dashboard-main'
import { DashboardDataLoader } from './dashboard-provider'

export const Dashboard = memo(function Dashboard() {
  return (
    <DashboardDataLoader>
      <DashboardBadge />
      <DashboardMain />
    </DashboardDataLoader>
  )
})

