import { FilterIcon, SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'
import isEqual from 'lodash/isEqual'
import {type DashboardRootState } from '@/stores/dashboard-store'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

interface CarListFilterProps {
    onResetFilters?: () => void

}

export function CarListFilter({ onResetFilters }: CarListFilterProps) {
    const values = useSelector((state: DashboardRootState) => state.dashboard.values)
    const { setOpen } = useSearch();

    const isClear = useMemo(() => {
        const initialValues = {
            minPrice: '',
            maxPrice: '',
            selectedMakes: [],
            selectedModels: [],
            selectedTrims: [],
            selectedBodyTypes: [],
            selectedTransmission: 'All'
        }
        return !isEqual(values, initialValues)
    }, [values])


    return (
        <div className="lg:pl-4 h-9 flex items-center justify-start">
            <div className="flex lg:hidden space-x-4 h-full items-center gap-1 transition-all duration-200">
                <SearchIcon
                    aria-hidden="true"
                    className="text-muted-foreground cursor-pointer"
                    color="#ff821c"
                    size={18}
                    onClick={() => setOpen(true)}
                />

                <Separator
                    className="bg-border h-full"
                    orientation="vertical"
                />

                <button
                    className="flex items-center gap-1"
                >
                    <FilterIcon color="#ff821c" aria-hidden="true" size={18} />
                    <br />
                    <span className="text-lg text-muted-foreground hover:underline transition-all duration-200">Filter</span>
                </button>

                <Separator
                    className="bg-border h-full mr-4"
                    orientation="vertical"
                />
            </div>

            {isClear && (
                <button
                    className="text-lg text-blue-400 hover:underline transition-all duration-200"
                    onClick={() => onResetFilters?.()}
                >
                    Clear Filters
                </button>
            )}
        </div>
    )
}