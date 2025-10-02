import { Main } from "@/components/layout/main"
import { DashboardFilter, type FormData, type DashboardFilterRef } from "./dashboard-filter"
import { CarList } from "./car-list/car-list"
import { useRef } from "react"


export function DashboardMain() {
    const dashboardFilterRef = useRef<DashboardFilterRef>(null)

    const onFilterChange = (formData: FormData) => {
        // eslint-disable-next-line no-console
        console.log(formData)
    }

    return (
        <Main>
            <div className='mb-4 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight' style={{ color: "#012169" }}>Cars for Sale</h1>
            </div>

            <div className="flex w-full gap-0 lg:gap-6">
                <DashboardFilter  onFilterChange={onFilterChange} ref={dashboardFilterRef}/>
                <section className="min-w-0 grow">
                    <CarList />
                </section>
            </div>
        </Main>
    )
}