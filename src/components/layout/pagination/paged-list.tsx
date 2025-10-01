import React from 'react';
import { usePagination, PaginationStatus, type UsePaginationOptions } from '@/hooks/use-pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- Các kiểu builder ---
type EmptyBuilder = () => React.ReactNode;
type SeparatorBuilder<T> = (index: number, item: T) => React.ReactNode;
type LoadingFirstPageBuilder = () => React.ReactNode;
type LoadingMoreBuilder = () => React.ReactNode;
type FirstPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type SubsequentPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type EndBuilder = () => React.ReactNode;
type ItemBuilder<T> = (index: number, item: T) => React.ReactNode;

type PagedListProps<T> = {
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
    hasScrollBar: boolean,
    invisibleItemsThreshold?: number;
};

export function PagedList<T>(props: PagedListProps<T>) {
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
    } = props;

    const {
        pagination: statePagination,
        status,
        handleInitial,
        renderPagedItem,
    } = usePagination<T>({
        onInitial,
        onRefresh,
        onLoadMore,
        initialPagination: pagination,
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


    // --- Xử lý build các trạng thái ---
    if (status === PaginationStatus.LOADING_FIRST_PAGE) {
        return <>{loadingFirstPageBuilder ? loadingFirstPageBuilder() : <div>Loading...</div>}</>;
    }
    if (status === PaginationStatus.FIRST_PAGE_ERROR) {
        return (
            <>
                {firstPageErrorBuilder
                    ? firstPageErrorBuilder(statePagination.error ?? null, handleInitial)
                    : <div>Error! <button onClick={handleInitial}>Thử lại</button></div>}
            </>
        );
    }
    if (status === PaginationStatus.NO_ITEMS_FOUND || statePagination.list.length === 0) {
        return <>{emptyBuilder ? emptyBuilder() : <div>Không có dữ liệu</div>}</>;
    }

    // --- Build List ---
    return (
        <ScrollArea hasScrollbar={hasScrollBar}>
            <div className={className}>
                {statePagination.list.map((item, index) => (
                    <React.Fragment key={itemKey(item)}>
                        {renderPagedItem(index)}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}