import { PagedList, type PagedListRef } from '@/components/layout/pagination/paged-list'
import { Pagination } from '@/components/layout/data/pagination'
import { updatePage } from '@/lib/utils'
import { ALL_CARS, PAGE_COUNT, PAGE_SIZE, TOTAL, type Car } from '@/features/dashboard/data/mock-data'
import {  useRef, useState } from 'react'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { FilterIcon, SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'
import { useSelector } from 'react-redux'
import { type DashboardRootState } from '@/stores/dashboard-store'

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function CarList() {
    const [pagination, setPagination] = useState<Pagination<Car>>(Pagination.empty())

    const pagedListRef = useRef<PagedListRef<Car>>(null);

    async function fetchPage(page: number): Promise<Pagination<Car>> {
        const safePage = Math.min(Math.max(page, 1), PAGE_COUNT)
        const start = (safePage - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        const list = ALL_CARS.slice(start, end)

        const result = new Pagination<Car>({
            list,
            page: safePage,
            pageSize: PAGE_SIZE,
            pageCount: PAGE_COUNT,
            total: TOTAL,
        })

        setPagination(updatePage(pagination, result))

        await delay(1000)

        // eslint-disable-next-line no-console
        console.log('pagination', updatePage(pagination, result))

        return updatePage(pagination, result);
    }


    return (
        <PagedList<Car>
            className="lg:pl-4 pr-2 pt-3 pb-2 grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-3"
            ref={pagedListRef}
            itemKey={(item) => item.id}
            pagination={pagination}
            onInitial={() => fetchPage(1)}
            onRefresh={() => fetchPage(1)}
            onLoadMore={(nextPage) => fetchPage(nextPage)}
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
    )
}

interface CarListFilterProps {
    onResetFilters?: () => void

}

export function CarListFilter({ onResetFilters }: CarListFilterProps) {
    const isDirty = useSelector((state: DashboardRootState) => state.dashboard.values.isDirty)
    const { setOpen } = useSearch();

 
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

            {isDirty && (
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