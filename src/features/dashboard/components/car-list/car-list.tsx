
import { type Car } from '@/features/dashboard/data/mock-data'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { useDispatch, useSelector } from 'react-redux'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { fetchPage } from '@/stores/dashboard-slice'
import { useRef } from 'react'
import { PagedGrid, type PagedGridRef } from '@/components/layout/pagination/paged-grid'
import { Loader } from 'lucide-react'
import { SuggestionList } from './suggestion-list'

export function CarList() {
    const dispatch = useDispatch<DashboardDispatch>();

    const state = useSelector((state: DashboardRootState) => state.dashboard);

    const pagedListRef = useRef<PagedGridRef<Car>>(null);

    if(state.isEmpty && state.isEmpty === true){
        return <SuggestionList/>
    }

    return (
        <PagedGrid<Car>
            className="lg:pl-4 pr-2 pt-3 pb-2"
            ref={pagedListRef}
            hasScrollBar={false}
            rowCount={4}
            itemKey={(item) => item.id}
            pagination={state.pagination}
            onInitial={() => dispatch(fetchPage(1)).unwrap()}
            onRefresh={() => dispatch(fetchPage(1)).unwrap()}
            onLoadMore={(nextPage) => dispatch(fetchPage(nextPage)).unwrap()}
            loadingFirstPageBuilder={() => (
                <div className="pl-4 pr-2 pt-3 grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <CarCardLoading key={idx} />
                    ))}
                </div>
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
            emptyBuilder={() => <div className='lg:pl-4 pr-2 pt-3'>Empty</div>}
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

