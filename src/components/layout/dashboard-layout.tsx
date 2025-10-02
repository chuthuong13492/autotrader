import { Outlet } from '@tanstack/react-router'
import { SearchProvider } from '@/context/search-provider'
import { SkipToMain } from '@/components/skip-to-main'
import { Provider} from "react-redux"
import { dashboardStore } from '@/stores/dashboard-store'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function DashboardLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <Provider store={dashboardStore} >
      <SearchProvider>
      <SkipToMain />
      <div className='@container/content min-h-svh'>
        {children ?? <Outlet />}
      </div>
    </SearchProvider>
    </Provider>
  )
}
