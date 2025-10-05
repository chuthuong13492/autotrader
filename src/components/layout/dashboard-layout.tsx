import { Outlet,  useLoaderData } from '@tanstack/react-router'
import { SearchProvider } from '@/context/search-provider'
import { SkipToMain } from '@/components/skip-to-main'
import { Provider } from "react-redux"
import { createDashboardStore } from '@/stores/dashboard-store'
import { type FilterTransmissionType } from '@/features/dashboard/components/dashboard-filter'
import { useRef } from 'react'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function DashboardLayout({ children }: AuthenticatedLayoutProps) {
  const loader = useLoaderData({ from: '/_dashboard/search-result-page/' }) as {
    formData: {
      minPrice?: number | undefined
      maxPrice?: number | undefined
      selectedMakes?: string[] | undefined
      selectedModels?: string[] | undefined
      selectedTrims?: string[] | undefined
      selectedBodyTypes?: string[] | undefined
      selectedTransmission?: string | undefined
    }
    searchValue: string
  }

  const storeRef = useRef(
    createDashboardStore({
      dashboard: {
        search: loader?.searchValue ?? '',
        values: {
          minPrice: loader?.formData?.minPrice !== undefined ? String(loader.formData.minPrice) : '',
          maxPrice: loader?.formData?.maxPrice !== undefined ? String(loader.formData.maxPrice) : '',
          selectedMakes: loader?.formData?.selectedMakes ?? [],
          selectedModels: loader?.formData?.selectedModels ?? [],
          selectedTrims: loader?.formData?.selectedTrims ?? [],
          selectedBodyTypes: loader?.formData?.selectedBodyTypes ?? [],
          selectedTransmission: (loader?.formData?.selectedTransmission as FilterTransmissionType) ?? 'All',
        },
      }
    })
  )
  const store = storeRef.current

  return (
    <Provider store={store} >
      <SearchProvider>
        <SkipToMain />
        <div className='@container/content min-h-svh'>
          {children ?? <Outlet />}
        </div>
      </SearchProvider>
    </Provider>
  )
}
