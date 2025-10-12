import { Provider, useDispatch } from 'react-redux'
import {  useEffect, useMemo } from 'react'
import {  dashboardStore, type DashboardDispatch } from '@/stores/dashboard-store'
import { type FilterTransmissionType } from '@/features/dashboard/components/dashboard-filter'
import { setState, type SortKey } from '@/stores/dashboard-slice'
import { useStableLocation } from '@/hooks/use-stable-location'

type DashboardDataLoaderProps = {
    children: React.ReactNode
}

export function DashboardDataLoader({ children }: DashboardDataLoaderProps) {
    const dispatch = useDispatch<DashboardDispatch>()
    const { pathname, search } = useStableLocation()

    // Only process search params when we're on the search-result-page route
    const isSearchResultPage = pathname.includes('/search-result-page')
    
    // Memoize the state update to prevent unnecessary dispatches
    const stateUpdate = useMemo(() => {
        if (!isSearchResultPage || !search) return null
        return {
            search: search.value ?? '',
            values: {
                minPrice: search.minPrice ?? '',
                maxPrice: search.maxPrice ?? '',
                selectedMakes: search.selectedMakes ?? '',
                selectedModels: search.selectedModels ?? '',
                selectedTrims: search.selectedTrims ?? '',
                selectedBodyTypes: search.selectedBodyTypes ?? [],
                selectedTransmission: (search.selectedTransmission as FilterTransmissionType) ?? 'All',
            },
            sort: (search.sort as SortKey) ?? 'relevance',
        }
    }, [search, isSearchResultPage])

    useEffect(() => {
        if (stateUpdate && isSearchResultPage) {
            const { values, sort } = stateUpdate;
            dispatch(setState({
                search: stateUpdate.search ?? '',
                sort: sort,
                values: {
                    minPrice: values.minPrice !== undefined ? String(values.minPrice) : '',
                    maxPrice: values.maxPrice !== undefined ? String(values.maxPrice) : '',
                    selectedMakes: values.selectedMakes ?? '',
                    selectedModels: values.selectedModels ?? '',
                    selectedTrims: values.selectedTrims ?? '',
                    selectedBodyTypes: values?.selectedBodyTypes ?? [],
                    selectedTransmission: (values.selectedTransmission as FilterTransmissionType) ?? 'All',
                }
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return children
}

type DashboardProviderProps = {
    children: React.ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
    return (
        <Provider store={dashboardStore}>
            {children}
        </Provider>
    )
}

