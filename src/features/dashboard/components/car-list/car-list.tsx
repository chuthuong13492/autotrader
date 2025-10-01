import { PagedList } from '@/components/layout/pagination/paged-list'
import { Pagination } from '@/components/layout/data/pagination'
import { BaseImage } from '@/components/ui/base-image'
import { cn, updatePage } from '@/lib/utils'
import { ALL_CARS, PAGE_COUNT, PAGE_SIZE, TOTAL, type Car } from '@/features/dashboard/data/mock-data'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}


export function CarList() {
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
        <PagedList<Car>
            itemKey={(item) => item.id}
            pagination={pagination}
            onInitial={() => fetchPage(1)}
            onRefresh={() => fetchPage(1)}
            onLoadMore={(nextPage) => fetchPage(nextPage)}
            loadingFirstPageBuilder={() => (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Skeleton key={idx} className="rounded-md h-[306px]" />
                    ))}
                </div>
            )}
            loadingMoreBuilder={() => (
                <Skeleton className="rounded-md h-[306px]" />
            )}
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
                <div className="rounded-md shadow">
                    <BaseImage src={car.imageUrl} alt={`${car.make} ${car.model}`} className="h-[306px] w-full rounded-md" />
                    <div className="p-3">
                        <div className={cn('font-semibold')}>{car.year} {car.make} {car.model}</div>
                        <div className="text-sm text-muted-foreground">{car.trim} • {car.mileage.toLocaleString()} mi</div>
                        <div className="mt-1 font-bold">${car.price.toLocaleString()}</div>
                    </div>
                </div>
            )}
            className="grid grid-cols-1 gap-x-4 w-full sm:grid-cols-2 xl:grid-cols-4"
            hasScrollBar={false}
        />
    )
}


