import React, { useEffect, useCallback, useReducer } from "react";
import { Pagination } from "@/components/layout/data/pagination";
import { useItemVisibility } from "./use-intersection-observer";

export enum PaginationStatus {
    INITIAL = "initial",
    LOADING_FIRST_PAGE = "loadingFirstPage",
    FIRST_PAGE_ERROR = "firstPageError",
    ONGOING = "ongoing",
    LOADING_MORE = "loadingMore",
    SUBSEQUENT_PAGE_ERROR = "subsequentPageError",
    COMPLETED = "completed",
    NO_ITEMS_FOUND = "noItemsFound"
}

export function getStatus<T>(pagination: Pagination<T>): PaginationStatus {
    if (pagination.page === 0) {
        return pagination.error == null
            ? PaginationStatus.INITIAL
            : PaginationStatus.FIRST_PAGE_ERROR;
    }
    if (pagination.list.length && pagination.isLast) {
        return PaginationStatus.COMPLETED;
    }
    if (pagination.total < 1 || pagination.list.length === 0) {
        return PaginationStatus.NO_ITEMS_FOUND;
    }
    if (pagination.error) {
        return PaginationStatus.SUBSEQUENT_PAGE_ERROR;
    }
    return PaginationStatus.ONGOING;
}

// Builder types
export type ItemKeyFn<T> = (item: T) => string | number;

export type RenderItemFn<T> = (params: {
    index: number;
    data: T;
    key: string | number;
    ref?: React.RefObject<HTMLElement>;
}) => React.ReactNode;

export type RenderSeparatorFn<T> = (params: {
    index: number;
    data: T;
}) => React.ReactNode;

export type RenderEmptyFn = () => React.ReactNode;
export type RenderLoadingFirstPageFn = () => React.ReactNode;
export type RenderLoadingMoreFn = () => React.ReactNode;
export type RenderEndFn = () => React.ReactNode;

export type RenderFirstPageErrorFn = (params: {
    error: string | null;
    onRetry: () => void;
}) => React.ReactNode;

export type RenderSubsequentPageErrorFn = (params: {
    error: string | null;
    onRetry: () => void;
}) => React.ReactNode;

// Hook options
export interface UsePaginationOptions<T> {
    onInitial: () => Promise<Pagination<T>>;
    onRefresh: () => Promise<Pagination<T>>;
    onLoadMore: (nextPage: number) => Promise<Pagination<T>>;
    invisibleItemsThreshold?: number;
    initialPagination?: Pagination<T>;
    itemKey: ItemKeyFn<T>;
    renderItem: RenderItemFn<T>;
    renderSeparator?: RenderSeparatorFn<T>;
    renderEmpty?: RenderEmptyFn;
    renderLoadingFirstPage?: RenderLoadingFirstPageFn;
    renderLoadingMore?: RenderLoadingMoreFn;
    renderFirstPageError?: RenderFirstPageErrorFn;
    renderSubsequentPageError?: RenderSubsequentPageErrorFn;
    renderEnd?: RenderEndFn;
};

export function usePagination<T>({
    onInitial,
    onRefresh,
    onLoadMore,
    invisibleItemsThreshold = 3,
    initialPagination,
    itemKey,
    renderItem,
    renderSeparator,
    renderLoadingMore,
    renderSubsequentPageError,
    renderEnd,
}: UsePaginationOptions<T>) {
    type State = {
        pagination: Pagination<T>;
        status: PaginationStatus;
        hasRequestedNextPage: boolean;
    };

    type Action =
        | { type: "INIT_REQUEST" }
        | { type: "INIT_SUCCESS"; payload: Pagination<T> }
        | { type: "REFRESH_SUCCESS"; payload: Pagination<T> }
        | { type: "LOAD_MORE_REQUEST" }
        | { type: "LOAD_MORE_SUCCESS"; payload: Pagination<T> }
        | { type: "SET_PAGINATION"; payload: Pagination<T> }
        | { type: "SET_HAS_REQUESTED_NEXT_PAGE"; payload: boolean };

    function reducer(state: State, action: Action): State {
        switch (action.type) {
            case "INIT_REQUEST": {
                return { ...state, status: PaginationStatus.LOADING_FIRST_PAGE };
            }
            case "INIT_SUCCESS": {
                const nextStatus = getStatus(action.payload);
                return { pagination: action.payload, status: nextStatus, hasRequestedNextPage: false };
            }
            case "REFRESH_SUCCESS": {
                const nextStatus = getStatus(action.payload);
                return { pagination: action.payload, status: nextStatus, hasRequestedNextPage: false };
            }
            case "LOAD_MORE_REQUEST": {
                return { ...state, status: PaginationStatus.LOADING_MORE };
            }
            case "LOAD_MORE_SUCCESS": {
                const nextStatus = getStatus(action.payload);
                return { pagination: action.payload, status: nextStatus, hasRequestedNextPage: false };
            }
            case "SET_PAGINATION": {
                const nextStatus = getStatus(action.payload);
                // Reset hasRequestedNextPage khi quay lại ONGOING
                const resetRequested = nextStatus === PaginationStatus.ONGOING ? false : state.hasRequestedNextPage;
                return { pagination: action.payload, status: nextStatus, hasRequestedNextPage: resetRequested };
            }
            case "SET_HAS_REQUESTED_NEXT_PAGE": {
                return { ...state, hasRequestedNextPage: action.payload };
            }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        pagination: initialPagination || Pagination.empty<T>(),
        status: getStatus<T>(initialPagination || Pagination.empty<T>()),
        hasRequestedNextPage: false,
    });

    const { pagination, status, hasRequestedNextPage } = state;

    useEffect(() => {
        if (status === PaginationStatus.INITIAL) {
            handleInitial();
        }
        // eslint-disable-next-line
    }, []);

    function updatePagination(newPagination: Pagination<T>) {
        dispatch({ type: "SET_PAGINATION", payload: newPagination });
    }

    async function handleInitial() {
        dispatch({ type: "INIT_REQUEST" });
        const result = await onInitial();
        dispatch({ type: "INIT_SUCCESS", payload: result });
    }

    async function handleRefresh() {
        const result = await onRefresh();
        dispatch({ type: "REFRESH_SUCCESS", payload: result });
    }

    async function handleLoadMore() {
        dispatch({ type: "LOAD_MORE_REQUEST" });
        const result = await onLoadMore(pagination.page + 1);
        dispatch({ type: "LOAD_MORE_SUCCESS", payload: result });
    }

    // Trigger load more when scroll near end
    const checkLoadMore = useCallback(
        (index: number) => {
            if (status === PaginationStatus.ONGOING && !hasRequestedNextPage) {
                const triggerIndex = Math.max(0, pagination.list.length - invisibleItemsThreshold);
                if (!pagination.isLast && index === triggerIndex) {
                    dispatch({ type: "SET_HAS_REQUESTED_NEXT_PAGE", payload: true });
                    setTimeout(() => handleLoadMore(), 0);
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pagination, status, hasRequestedNextPage, invisibleItemsThreshold]
    );

    // -------------------
    // BUILDER: render item theo trạng thái
    // -------------------
    function renderPagedItem(index: number): React.ReactNode {
        return (
            <PagedItem
                key={itemKey(pagination.list[index])}
                index={index}
                pagination={pagination}
                status={status}
                itemKey={itemKey}
                renderItem={renderItem}
                renderSeparator={renderSeparator}
                renderLoadingMore={renderLoadingMore}
                renderSubsequentPageError={renderSubsequentPageError}
                renderEnd={renderEnd as RenderEndFn}
                onCheckLoadMore={checkLoadMore}
                onRetryLoadMore={handleLoadMore}
            />
        );
    }



    // Kết quả trả về cho component sử dụng
    return {
        pagination,
        status,
        handleInitial,
        handleRefresh,
        handleLoadMore,
        renderPagedItem,
        updatePagination,
    };
}


interface PagedItemProps<T> {
    index: number;
    pagination: Pagination<T>;
    status: PaginationStatus;
    itemKey: ItemKeyFn<T>;
    renderItem: RenderItemFn<T>;
    renderSeparator?: RenderSeparatorFn<T>;
    renderLoadingMore?: () => React.ReactNode;
    renderSubsequentPageError?: (params: { error: string | null; onRetry: () => void }) => React.ReactNode;
    renderEnd?: () => React.ReactNode;
    onCheckLoadMore: (index: number) => void;
    onRetryLoadMore: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function PagedItemComponent<T>({
    index,
    pagination,
    status,
    itemKey,
    renderItem,
    renderSeparator,
    renderLoadingMore,
    renderSubsequentPageError,
    renderEnd,
    onCheckLoadMore,
    onRetryLoadMore,
}: PagedItemProps<T>) {
    const itemData = pagination.list[index];

    const { ref, setIndex } = useItemVisibility((visibleIndex) => {
        onCheckLoadMore(visibleIndex);
    });

    useEffect(() => {
        setIndex(index);
    }, [index, setIndex]);

    let item = renderItem({
        index,
        data: itemData,
        key: itemKey(itemData),
    });

    if (index === pagination.list.length - 1) {
        switch (status) {
            case PaginationStatus.LOADING_MORE:
                item = (
                    <>
                        {item}
                        {renderSeparator?.({ index, data: itemData })}
                        {renderLoadingMore?.()}
                    </>
                );
                break;
            case PaginationStatus.SUBSEQUENT_PAGE_ERROR:
                item = (
                    <>
                        {item}
                        {renderSubsequentPageError?.({
                            error: pagination.error ?? null,
                            onRetry: onRetryLoadMore,
                        })}
                    </>
                );
                break;
            case PaginationStatus.COMPLETED:
                item = (
                    <>
                        {item}
                        {renderEnd?.()}
                    </>
                );
                break;
        }
    }

    return (
        <div ref={ref} key={itemKey(itemData)}>
            {item}
        </div>
    );
};

function areEqual<T>(prev: PagedItemProps<T>, next: PagedItemProps<T>) {
    return (
        prev.index === next.index &&
        prev.status === next.status &&
        prev.pagination.list[prev.index] === next.pagination.list[next.index] &&
        prev.pagination.error === next.pagination.error
    );
}

const PagedItem = React.memo(PagedItemComponent, areEqual) as typeof PagedItemComponent;