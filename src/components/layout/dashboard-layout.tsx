import { Outlet } from '@tanstack/react-router'
import { SkipToMain } from '@/components/skip-to-main'
import { DashboardProvider } from '@/features/dashboard/dashboard-provider'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function DashboardLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <DashboardProvider >
      <SkipToMain />
        <div className='@container/content min-h-svh'>
          {children ?? <Outlet />}
        </div>
    </DashboardProvider>
  )
}
