
import { type Car } from '@/features/dashboard/data/mock-data'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { useDispatch, useSelector } from 'react-redux'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { fetchPage } from '@/stores/dashboard-slice'
import { PagedGrid } from '@/components/layout/pagination/paged-grid'
import { Loader } from 'lucide-react'
import { SuggestionList } from './suggestion-list'
import { useMemo } from 'react'

export function CarList() {
    const dispatch = useDispatch<DashboardDispatch>();

    const state = useSelector((state: DashboardRootState) => state.dashboard);

    const pagination = useMemo(()=> state.pagination, [state.pagination]);

    return (
        <PagedGrid<Car>
            className="lg:pl-4 pr-2 pt-3 pb-2"
            itemKey={(item) => item.id}
            pagination={pagination}
            onInitial={() => dispatch(fetchPage(1)).unwrap()}
            onRefresh={() => dispatch(fetchPage(1)).unwrap()}
            onLoadMore={(nextPage) => dispatch(fetchPage(nextPage)).unwrap()}
            loadingFirstPageBuilder={() => (
                  <>
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <CarCardLoading key={idx} />
                    ))}
                  </>
            )}
            loadingMoreBuilder={() => (
                <div className='flex w-full items-center justify-center gap-2 py-4'>
                    <Loader className='h-5 w-5 animate-spin' />
                    {'  '}
                    Loading...
                </div>
            )}
            firstPageErrorBuilder={(error, onRetry) => (
                <div className="p-4 text-center">
                    <div className="mb-2 text-destructive">{error ?? 'Có lỗi xảy ra'}</div>
                    <button className="underline" onClick={onRetry}>Thử lại</button>
                </div>
            )}
            emptyBuilder={() =>
                <SuggestionList />
            }
            subsequentPageErrorBuilder={(error, onRetry) => (
                <div className="py-3 text-center text-sm text-destructive">
                    {error ?? 'Tải thêm thất bại'} — <button className="underline" onClick={onRetry}>Thử lại</button>
                </div>
            )}
            separatorBuilder={() => (
                <div className="h-4" />
            )}
            itemBuilder={(index, car) => (
                <div
                    className="animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{
                        animationDelay: `${index * 20}ms`,
                        animationDuration: '150ms',
                        animationFillMode: 'both'
                    }}
                >
                    <CarCard car={car} />
                </div>
            )}
        />
    )
}

