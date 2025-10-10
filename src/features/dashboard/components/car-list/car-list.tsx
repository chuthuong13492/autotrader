
import { type Car } from '@/features/dashboard/data/mock-data'
import { CarCard } from '../car-card/car-card'
import { CarCardLoading } from '../car-card/car-card-loading'
import { useDispatch } from 'react-redux'
import { type DashboardDispatch } from '@/stores/dashboard-store'
import { fetchPage } from '@/stores/dashboard-slice'
import { PagedGrid, type PagedGridRef } from '@/components/layout/pagination/paged-grid'
import { Loader } from 'lucide-react'
import { SuggestionList } from './suggestion-list'
import { forwardRef, useImperativeHandle, useRef, useCallback } from 'react'
import type { Pagination } from '@/components/layout/data/pagination'
export interface CarListRef {
    updatePagination: (pagination: Pagination<Car>) => void;
}

export const CarList = forwardRef<CarListRef>((_, ref) => {
    const dispatch = useDispatch<DashboardDispatch>();
    const pagedRef = useRef<PagedGridRef<Car>>(null);

    const handlePagination = useCallback(async (page: number) => {
        const result = await dispatch(fetchPage(page)).unwrap();
        return result;
    }, [dispatch]);

    const handleUpdatePagination = useCallback((pagination: Pagination<Car>) => {
        pagedRef.current?.updatePagination(pagination);
    }, []);

    // Memoized builders
    const renderLoadingFirstPage = useCallback(() => (
        <>
            {Array.from({ length: 12 }).map((_, idx) => (
                <CarCardLoading key={idx} />
            ))}
        </>
    ), []);

    const renderLoadingMore = useCallback(() => (
        <div className='flex w-full items-center justify-center gap-2 py-4'>
            <Loader className='h-5 w-5 animate-spin' />
            {'  '}
            Loading...
        </div>
    ), []);

    const renderFirstPageError = useCallback((error: string | null, onRetry: () => void) => (
        <div className="p-4 text-center">
            <div className="mb-2 text-destructive">{error ?? 'Có lỗi xảy ra'}</div>
            <button className="underline" onClick={onRetry}>Thử lại</button>
        </div>
    ), []);

    const renderEmpty = useCallback(() => (
        <SuggestionList />
    ), []);

    const renderSubsequentPageError = useCallback((error: string | null, onRetry: () => void) => (
        <div className="py-3 text-center text-sm text-destructive">
            {error ?? 'Tải thêm thất bại'} — <button className="underline" onClick={onRetry}>Thử lại</button>
        </div>
    ), []);

    const renderSeparator = useCallback(() => (
        <div className="h-4" />
    ), []);

    const renderItem = useCallback((index: number, car: Car) => (
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
    ), []);

    // Expose updatePagination method to parent components
    useImperativeHandle(ref, () => ({
        updatePagination: (pagination) => {
            handleUpdatePagination(pagination);
        }
    }), [handleUpdatePagination]);


    return (
        <PagedGrid<Car>
            ref={ref}
            className="lg:pl-4 pr-2 pt-3 pb-2"
            itemKey={(item) => item.id}
            onInitial={() => handlePagination(1)}
            onRefresh={() => handlePagination(1)}
            onLoadMore={handlePagination}
            loadingFirstPageBuilder={renderLoadingFirstPage}
            loadingMoreBuilder={renderLoadingMore}
            firstPageErrorBuilder={renderFirstPageError}
            emptyBuilder={renderEmpty}
            subsequentPageErrorBuilder={renderSubsequentPageError}
            separatorBuilder={renderSeparator}
            itemBuilder={renderItem}
        />
    )
});

