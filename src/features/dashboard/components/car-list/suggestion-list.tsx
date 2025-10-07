
import { SUGGESTION, type Car } from '@/features/dashboard/data/mock-data'
import { CarCardLoading } from '../car-card/car-card-loading'
import { PagedGrid } from '@/components/layout/pagination/paged-grid'
import { Loader } from 'lucide-react'
import { emptyPagination, type Pagination } from '@/components/layout/data/pagination'
import { useState } from 'react'
import { updatePage } from '@/lib/utils'
import { SuggestionCard } from '../car-card/suggestion-card'

export function SuggestionList() {
    const [pagination, setPagination] = useState<Pagination<Car>>(emptyPagination())

    const fetchPage = async (page: number): Promise<Pagination<Car>> => {
        const total = SUGGESTION.length;
        const pageCount = Math.ceil(total / 10);
        const safePage = Math.min(Math.max(page, 1), pageCount);
        const start = (safePage - 1) * 10;
        const end = start + 10;
        const list = SUGGESTION.slice(start, end);

        const result = {
            list: list,
            page: safePage,
            pageSize: 10,
            pageCount: pageCount,
            total: total,
        }


        const updatePagination = updatePage(pagination, result);

        setPagination(updatePagination);

        return updatePagination;
    };

    return (
        <PagedGrid<Car>
            className="lg:pl-4 pr-2 pt-3 pb-2"
            hasScrollBar={false}
            rowCount={4}
            itemKey={(item) => item.id}
            onInitial={() => fetchPage(1)}
            onRefresh={() => fetchPage(1)}
            onLoadMore={(nextPage) => fetchPage(nextPage)}
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
                    <SuggestionCard car={car} />
                </div>
            )}
        />
    )
}

