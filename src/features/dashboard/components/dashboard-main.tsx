import { Main } from "@/components/layout/main"
import { DashboardFilter, type FormData, type FilterTransmissionType, type FilterRef } from "./dashboard-filter"
import { CarList } from "./car-list/car-list"
import { CarListFilter } from "./car-list/car-list-filter"
import { useRef } from "react"
import { Search } from "@/components/search"
import { useRouter } from "@tanstack/react-router"
import { type DashboardRootState, type DashboardDispatch } from "@/stores/dashboard-store"
import { useDispatch, useSelector } from "react-redux"
import { filterPage, type SortKey } from "@/stores/dashboard-slice"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"

type SearchParams = {
    value?: string
    minPrice?: number
    maxPrice?: number
    selectedMakes?: string
    selectedModels?: string
    selectedTrims?: string
    selectedBodyTypes?: string[]
    selectedTransmission?: FilterTransmissionType
    sort?: SortKey
}

function buildSearchParams(
    formData: Partial<FormData>,
    search?: string,
    sort?: SortKey
): SearchParams {
    const nextSearch: SearchParams = {}

    if (search) nextSearch.value = search
    if (formData.minPrice) nextSearch.minPrice = Number(formData.minPrice)
    if (formData.maxPrice) nextSearch.maxPrice = Number(formData.maxPrice)
    if (formData.selectedMakes) nextSearch.selectedMakes = formData.selectedMakes
    if (formData.selectedModels) nextSearch.selectedModels = formData.selectedModels
    if (formData.selectedTrims) nextSearch.selectedTrims = formData.selectedTrims
    if (formData.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = formData.selectedBodyTypes
    if (formData.selectedTransmission && formData.selectedTransmission !== 'All') {
        nextSearch.selectedTransmission = formData.selectedTransmission
    }
    if (sort) nextSearch.sort = sort

    return nextSearch
}

export function DashboardMain() {
    const dashboardFilterRef = useRef<FilterRef>(null);

    const dispatch = useDispatch<DashboardDispatch>()
    const state = useSelector((state: DashboardRootState) => state.dashboard)


    const router = useRouter()

    const onFilterChange = (formData: Partial<FormData>) => {
        const { search, sort } = state
        dispatch(filterPage(formData))

        const nextSearch = buildSearchParams(formData, search, sort)
        const nextLocation = router.buildLocation({
            from: '/search-result-page',
            to: '.',
            search: nextSearch,
        })
        router.history.replace(nextLocation.href)
    }


    const onResetFilters = () => dashboardFilterRef.current?.reset();

    const onSortChange = (sort: SortKey) => {
        const { values, search } = state
        const nextSearch = buildSearchParams(values, search, sort)
        const nextLocation = router.buildLocation({
            from: '/search-result-page',
            to: '.',
            search: nextSearch,
        })
        router.history.replace(nextLocation.href)
    }

    return (
        <Main className="px-2">
            <div className='pl-2 mb-4 flex items-center justify-between space-y-2'>
                <DynamicBreadcrumb />
            </div>
            <div className="pl-2 flex w-full">
                <div className="space-y-2">
                    {/* Search */}
                    <div className='!w-full'>
                        <Search className="hidden lg:block max-w-xs min-w-[16rem]" />
                    </div>
                    {/* Filter */}
                    <DashboardFilter onFilterChange={onFilterChange} ref={dashboardFilterRef} />
                </div>
                <section className="min-w-0 grow">
                    <CarListFilter onResetFilters={onResetFilters} onSortChange={onSortChange} />
                    <CarList />
                </section>
            </div>
        </Main>
    )
}