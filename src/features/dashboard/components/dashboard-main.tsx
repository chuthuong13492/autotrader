import { Main } from "@/components/layout/main"
import { DashboardFilter, type FormData, type DashboardFilterRef } from "./dashboard-filter"
import { CarList } from "./car-list/car-list"
import { useRef, useState } from "react"
import { type FormState, type FieldErrors } from "react-hook-form"


export function DashboardMain() {
    const dashboardFilterRef = useRef<DashboardFilterRef>(null);
    const [formState, setFormState] = useState<{ isDirty: boolean; errors: FieldErrors<FormData> } | null>(null)

    const onFilterChange = (formData: Partial<FormData>, formState: FormState<FormData>) => {
        // eslint-disable-next-line no-console
        console.log(formData)
        
        // Cập nhật formState khi có thay đổi
        if (dashboardFilterRef.current) {
            setFormState(formState)
        }
    }

    const onResetFilters = () => dashboardFilterRef.current?.reset();

    return (
        <Main className="px-2">
            <div className='pl-2 mb-4 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight' style={{ color: "#012169" }}>Cars for Sale</h1>
            </div>

            <div className="pl-2 flex w-full">
                <DashboardFilter onFilterChange={onFilterChange} ref={dashboardFilterRef}/>
                <section className="min-w-0 grow">
                    <CarList onResetFilters={onResetFilters} formState={formState}/>
                </section>
            </div>
        </Main>
    )
}