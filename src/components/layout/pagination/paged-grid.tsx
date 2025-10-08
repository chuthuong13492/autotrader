import React, { forwardRef, useImperativeHandle } from 'react';
import { usePagination, PaginationStatus, type UsePaginationOptions } from '@/hooks/use-pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Pagination } from '../data/pagination';
import { cn } from '@/lib/utils';

// --- Các kiểu builder ---
type EmptyBuilder = () => React.ReactNode;
type SeparatorBuilder<T> = (index: number, item: T) => React.ReactNode;
type LoadingFirstPageBuilder = () => React.ReactNode;
type LoadingMoreBuilder = () => React.ReactNode;
type FirstPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type SubsequentPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type EndBuilder = () => React.ReactNode;
type ItemBuilder<T> = (index: number, item: T) => React.ReactNode;

export interface PagedGridRef<T> {
    updatePagination: (pagination: Pagination<T>, options?: { setLoadingFirstPage?: boolean; delayMs?: number }) => void;
}

type PagedGridProps<T> = {
    itemKey: (item: T) => string;
    itemBuilder: ItemBuilder<T>;
    pagination?: UsePaginationOptions<T>['initialPagination'];
    className?: string;
    emptyBuilder?: EmptyBuilder;
    loadingFirstPageBuilder?: LoadingFirstPageBuilder;
    loadingMoreBuilder?: LoadingMoreBuilder;
    separatorBuilder?: SeparatorBuilder<T>;
    firstPageErrorBuilder?: FirstPageErrorBuilder;
    subsequentPageErrorBuilder?: SubsequentPageErrorBuilder;
    endBuilder?: EndBuilder;
    onInitial: UsePaginationOptions<T>['onInitial'];
    onRefresh: UsePaginationOptions<T>['onRefresh'];
    onLoadMore: UsePaginationOptions<T>['onLoadMore'];
    hasScrollBar?: boolean,
    invisibleItemsThreshold?: number;
    rowCount?: number;
    orientation?: 'vertical' | 'horizontal'
};

function InnerPagedGrid<T>(
    props: PagedGridProps<T>,
    ref: React.ForwardedRef<PagedGridRef<T>>
) {
    const {
        itemKey,
        itemBuilder,
        className,
        emptyBuilder,
        loadingFirstPageBuilder,
        loadingMoreBuilder,
        separatorBuilder,
        firstPageErrorBuilder,
        subsequentPageErrorBuilder,
        endBuilder,
        onInitial,
        onRefresh,
        onLoadMore,
        pagination,
        invisibleItemsThreshold,
        hasScrollBar = false,
        rowCount = 4,
        orientation = 'vertical',
    } = props;

    const {
        pagination: statePagination,
        status,
        handleInitial,
        handleLoadMore,
        updatePagination,
        renderPagedItemWithNoState,
    } = usePagination<T>({
        initialPagination: pagination,
        onInitial,
        onRefresh,
        onLoadMore,
        itemKey,
        renderItem: ({ index, data }) => itemBuilder(index, data),
        renderSeparator: separatorBuilder
            ? ({ index, data }) => separatorBuilder(index, data)
            : undefined,
        renderEmpty: emptyBuilder,
        renderLoadingFirstPage: loadingFirstPageBuilder,
        renderLoadingMore: loadingMoreBuilder,
        renderFirstPageError: firstPageErrorBuilder
            ? ({ error, onRetry }) => firstPageErrorBuilder(error, onRetry)
            : undefined,
        renderSubsequentPageError: subsequentPageErrorBuilder
            ? ({ error, onRetry }) => subsequentPageErrorBuilder(error, onRetry)
            : undefined,
        renderEnd: endBuilder,
        invisibleItemsThreshold,
    });

    useImperativeHandle(ref, () => ({
        updatePagination,
    }), [updatePagination]);

    // --- Xử lý build các trạng thái ---
    if (status === PaginationStatus.LOADING_FIRST_PAGE) {
        return loadingFirstPageBuilder &&
            <ScrollArea orientation={orientation} hasScrollbar={false}>
                <div
                    className={cn(
                        `grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-${rowCount}`,
                        className,
                    )}>
                    {loadingFirstPageBuilder()}
                </div>
            </ScrollArea>;
            
    }

    if (status === PaginationStatus.FIRST_PAGE_ERROR) {
        return (
            <>
                {firstPageErrorBuilder
                    ? firstPageErrorBuilder(statePagination.error ?? null, handleInitial)
                    : <div>Error! <button onClick={handleInitial}>Retry</button></div>}
            </>
        );
    }
    if (status === PaginationStatus.NO_ITEMS_FOUND || statePagination.list.length === 0) {
        return <>{emptyBuilder ? emptyBuilder() : <div>Empty</div>}</>;
    }



    return (
        <ScrollArea hasScrollbar={hasScrollBar}>
            <div className={cn(
                `grid grid-cols-1 gap-x-4 w-full md:grid-cols-2 lg:grid-cols-${rowCount}`,
                className,
            )}>
                {statePagination.list.map((item: T, index: number) => (
                    <React.Fragment key={itemKey(item)}>
                        {renderPagedItemWithNoState(index)}
                    </React.Fragment>
                ))}

            </div>

            {status === PaginationStatus.LOADING_MORE && loadingMoreBuilder?.()}

            {status === PaginationStatus.COMPLETED && endBuilder?.()}

            {status === PaginationStatus.SUBSEQUENT_PAGE_ERROR && subsequentPageErrorBuilder?.(
                statePagination.error ?? null,
                handleLoadMore
            )}
        </ScrollArea>
    );
}

// 👇 Export component có generic
export const PagedGrid = forwardRef(InnerPagedGrid) as <T>(
    props: PagedGridProps<T> & { ref?: React.Ref<PagedGridRef<T>> }
) => React.ReactElement;