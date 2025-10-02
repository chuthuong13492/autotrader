import { PagedList } from '@/components/layout/pagination/paged-list'
import { Pagination } from '@/components/layout/data/pagination'
import { updatePage } from '@/lib/utils'
import { ALL_CARS, PAGE_COUNT, PAGE_SIZE, TOTAL, type Car } from '@/features/dashboard/data/mock-data'
import { useMemo, useState } from 'react'
import { type FieldErrors } from 'react-hook-form'
import { type FormData } from '../dashboard-filter'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { FilterIcon, SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

interface CarListProps {
    onResetFilters?: () => void
    formState?: { isDirty: boolean; errors: FieldErrors<FormData> } | null
}

export function CarList({ onResetFilters, formState }: CarListProps) {
    const [pagination, setPagination] = useState<Pagination<Car>>(Pagination.empty())

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
        <div className=''>
            <CarListFilter onResetFilters={onResetFilters} formState={formState} />

            <PagedList<Car>
                className="lg:pl-8 pr-2 pt-3 pb-2 grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-4"
                itemKey={(item) => item.id}
                pagination={pagination}
                onInitial={() => fetchPage(1)}
                onRefresh={() => fetchPage(1)}
                onLoadMore={(nextPage) => fetchPage(nextPage)}
                loadingFirstPageBuilder={() => (
                    <div className="pl-8 pr-2 pt-3 grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-4">
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
    formState?: { isDirty: boolean; errors: FieldErrors<FormData> } | null
}

function CarListFilter({ onResetFilters, formState }: CarListFilterProps) {
    const { setOpen } = useSearch();

    const isClear = useMemo(() => {
        return formState?.isDirty
    }, [formState]);

    return (
        <div className="lg:pl-8 h-9 flex items-center justify-start">
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