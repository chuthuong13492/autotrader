import { PagedList, type PagedListRef } from '@/components/layout/pagination/paged-list'
import { type Car } from '@/features/dashboard/data/mock-data'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { useDispatch, useSelector } from 'react-redux'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { fetchPage } from '@/stores/dashboard-slice'
import { useRef } from 'react'
import { useUpdateEffect } from '@/hooks/use-update-effect'

export function CarList() {
    const dispatch = useDispatch<DashboardDispatch>()

    const state = useSelector((state: DashboardRootState) => state.dashboard)

    const pagedListRef = useRef<PagedListRef<Car>>(null)

    useUpdateEffect(() => {
        pagedListRef.current?.updatePagination(state.pagination, {
            setLoadingFirstPage: true,
        })
    }, [state.pagination])

    return (
        <PagedList<Car>
            className="lg:pl-4 pr-2 pt-3 pb-2 grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-4"
            ref={pagedListRef}
            itemKey={(item) => item.id}
            onInitial={() => dispatch(fetchPage(1)).unwrap()}
            onRefresh={() => dispatch(fetchPage(1)).unwrap()}
            onLoadMore={(nextPage) => dispatch(fetchPage(nextPage)).unwrap()}
            loadingFirstPageBuilder={() => (
                <div className="pl-4 pr-2 pt-3 grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-4">
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
            emptyBuilder={() => <div className='lg:pl-4 pr-2 pt-3'>Empty</div>}
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

