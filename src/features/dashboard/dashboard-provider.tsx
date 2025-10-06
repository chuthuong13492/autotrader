import { Provider, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { createDashboardStore, type DashboardDispatch } from '@/stores/dashboard-store'
import { type FilterTransmissionType } from '@/features/dashboard/components/dashboard-filter'
import { useLoaderData } from '@tanstack/react-router'
import { setState } from '@/stores/dashboard-slice'

type DashboardDataLoaderProps = {
    children: React.ReactNode
}

export function DashboardDataLoader({ children }: DashboardDataLoaderProps) {
    // const location = useLocation();

    const dispatch = useDispatch<DashboardDispatch>()

    const loader = useLoaderData({ from: '/_dashboard/search-result-page/' }) as {
        formData: {
            minPrice?: number | undefined
            maxPrice?: number | undefined
            selectedMakes?: string | undefined
            selectedModels?: string | undefined
            selectedTrims?: string | undefined
            selectedBodyTypes?: string[] | undefined
            selectedTransmission?: string | undefined
        }
        searchValue: string
    }

    useEffect(() => {
        dispatch(setState({
            search: loader.searchValue ?? '',
            values: {
                minPrice: loader.formData?.minPrice !== undefined ? String(loader.formData.minPrice) : '',
                maxPrice: loader.formData?.maxPrice !== undefined ? String(loader.formData.maxPrice) : '',
                selectedMakes: loader.formData?.selectedMakes ?? '',
                selectedModels: loader.formData?.selectedModels ?? '',
                selectedTrims: loader.formData?.selectedTrims ?? '',
                selectedBodyTypes: loader.formData?.selectedBodyTypes ?? [],
                selectedTransmission: (loader.formData?.selectedTransmission as FilterTransmissionType) ?? 'All',
            }
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>{children}</>
}

type DashboardProviderProps = {
    children: React.ReactNode
}


export function DashboardProvider({ children }: DashboardProviderProps) {
    const storeRef = useRef(
        createDashboardStore({
            dashboard: {
                search: '',
                values: {
                    minPrice: '',
                    maxPrice: '',
                    selectedMakes: '',
                    selectedModels: '',
                    selectedTrims: '',
                    selectedBodyTypes: [],
                    selectedTransmission: 'All' as FilterTransmissionType,
                },
            }
        })
    )

    const store = storeRef.current

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
