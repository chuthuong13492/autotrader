import React, { forwardRef, useImperativeHandle } from 'react';
import { usePagination, PaginationStatus, type UsePaginationOptions } from '@/hooks/use-pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Pagination } from '../data/pagination';

// --- Các kiểu builder ---
type EmptyBuilder = () => React.ReactNode;
type SeparatorBuilder<T> = (index: number, item: T) => React.ReactNode;
type LoadingFirstPageBuilder = () => React.ReactNode;
type LoadingMoreBuilder = () => React.ReactNode;
type FirstPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type SubsequentPageErrorBuilder = (error: string | null, onRetry: () => void) => React.ReactNode;
type EndBuilder = () => React.ReactNode;
type ItemBuilder<T> = (index: number, item: T) => React.ReactNode;

export interface PagedListRef<T> {
    updatePagination: (pagination: Pagination<T>) => void;
}

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

function InnerPagedList<T>(
  props: PagedListProps<T>,
  ref: React.ForwardedRef<PagedListRef<T>>
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
  } = props;

  const {
    pagination: statePagination,
    status,
    handleInitial,
    renderPagedItem,
    updatePagination,
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

  return (
    <ScrollArea hasScrollbar={hasScrollBar}>
      <div className={className}>
        {statePagination.list.map((item: T, index: number) => (
          <React.Fragment key={itemKey(item)}>
            {renderPagedItem(index)}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

// 👇 Export component có generic
export const PagedList = forwardRef(InnerPagedList) as <T>(
  props: PagedListProps<T> & { ref?: React.Ref<PagedListRef<T>> }
) => React.ReactElement;