import { Outlet } from '@tanstack/react-router'
import { SearchProvider } from '@/context/search-provider'
import { SkipToMain } from '@/components/skip-to-main'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <SearchProvider>
      <SkipToMain />
      <div className='@container/content min-h-svh'>
        {children ?? <Outlet />}
      </div>
    </SearchProvider>
  )
}
