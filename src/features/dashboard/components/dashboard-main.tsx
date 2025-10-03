import { Main } from "@/components/layout/main"
import { DashboardFilter, type FormData, type DashboardFilterRef, type FilterTransmissionType } from "./dashboard-filter"
import { CarList, CarListFilter } from "./car-list/car-list"
import { useRef } from "react"
import { Search } from "@/components/search"
import { useRouter } from "@tanstack/react-router"
import { type DashboardRootState, type DashboardDispatch } from "@/stores/dashboard-store"
import { useDispatch, useSelector } from "react-redux"
import { filterPage, setForm } from "@/stores/dashboard-slice"


export function DashboardMain() {
    const dashboardFilterRef = useRef<DashboardFilterRef>(null);

    const dispatch = useDispatch<DashboardDispatch>()
    const state = useSelector((state: DashboardRootState) => state.dashboard)

    const router = useRouter()

    const onFilterChange = (formData: Partial<FormData>) => {
        const { values, search } = state


        dispatch(setForm({ ...values, ...formData}))

        const nextSearch: Partial<{
            value: string
            minPrice: number
            maxPrice: number
            selectedMakes: string[]
            selectedModels: string[]
            selectedTrims: string[]
            selectedBodyTypes: string[]
            selectedTransmission: FilterTransmissionType
        }> = {}
        if (search) nextSearch.value = search
        if (formData.minPrice) nextSearch.minPrice = Number(formData.minPrice)
        if (formData.maxPrice) nextSearch.maxPrice = Number(formData.maxPrice)
        if (formData.selectedMakes?.length) nextSearch.selectedMakes = formData.selectedMakes
        if (formData.selectedModels?.length) nextSearch.selectedModels = formData.selectedModels
        if (formData.selectedTrims?.length) nextSearch.selectedTrims = formData.selectedTrims
        if (formData.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = formData.selectedBodyTypes
        if (formData.selectedTransmission && formData.selectedTransmission !== 'All') {
            nextSearch.selectedTransmission = formData.selectedTransmission
        }
        const nextLocation = router.buildLocation({
            from: '/search-result-page',
            to: '.',
            search: nextSearch,
        })
        router.history.replace(nextLocation.href)
        
        dispatch(filterPage(1))
    }

    const onResetFilters = () => dashboardFilterRef.current?.reset();


    return (
        <Main className="px-2">
            <div className='pl-2 mb-4 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight' style={{ color: "#012169" }}>Cars for Sale</h1>
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
                    <CarListFilter onResetFilters={onResetFilters} />

                    <CarList />
                </section>
            </div>
        </Main>
    )
}