import { PagedList, type PagedListRef } from '@/components/layout/pagination/paged-list'
import { type Car } from '@/features/dashboard/data/mock-data'

import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { FilterIcon, SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { fetchPage } from '@/stores/dashboard-slice'
import { useEffect, useMemo, useRef } from 'react'
import isEqual from 'lodash/isEqual'

export function CarList() {
    const dispatch = useDispatch<DashboardDispatch>()

    const state = useSelector((state: DashboardRootState) => state.dashboard)

    const pagedListRef = useRef<PagedListRef<Car>>(null)

    useEffect(() => {
        pagedListRef.current?.updatePagination(state.pagination)
    }, [state.pagination])

    return (
        <div className='lg:pl-4 pr-2 pt-3 pb-2 '>
            <PagedList<Car>
            className="grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-3"
            ref={pagedListRef}
            itemKey={(item) => item.id}
            pagination={state.pagination}
            onInitial={() => dispatch(fetchPage(1)).unwrap()}
            onRefresh={() => dispatch(fetchPage(1)).unwrap()}
            onLoadMore={(nextPage) => dispatch(fetchPage(nextPage)).unwrap()}
            loadingFirstPageBuilder={() => (
                <div className="pl-4 pr-2 pt-3 grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <CarCardLoading key={idx} />
                    ))}
                </div>
            )}
            loadingMoreBuilder={() => <CarCardLoading />}
            firstPageErrorBuilder={(error, onRetry) => (
                <div className="p-4 text-center">
                    <div className="mb-2 text-destructive">{error ?? 'Có lỗi xảy ra'}</div>
                    <button className="underline" onClick={onRetry}>Thử lại</button>
                </div>
            )}
            subsequentPageErrorBuilder={(error, onRetry) => (
                <div className="py-3 text-center text-sm text-destructive">
                    {error ?? 'Tải thêm thất bại'} — <button className="underline" onClick={onRetry}>Thử lại</button>
                </div>
            )}
            separatorBuilder={() => (
                <div className="h-4" />
            )}
            itemBuilder={(_, car) => (
                <CarCard car={car} />
            )}

            hasScrollBar={false}
        />
        </div>
    )
}

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