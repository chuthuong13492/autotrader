export interface Pagination<T> {
  list: T[]
  page: number
  pageSize: number
  pageCount: number
  total: number
  error?: string | null
}

export function emptyPagination<T>(): Pagination<T> {
  return { list: [], page: 0, pageSize: 0, pageCount: 0, total: 0 }
}

export function copyWithPagination<T>(
  pagination: Pagination<T>,
  updates: Partial<Pagination<T>> & { list?: T[] }
): Pagination<T> {
  return {
    list: updates.list ?? pagination.list,
    page: updates.page ?? pagination.page,
    pageSize: updates.pageSize ?? pagination.pageSize,
    pageCount: updates.pageCount ?? pagination.pageCount,
    total: updates.total ?? pagination.total,
    error: updates.error ?? pagination.error,
  }
}

export function isLastPage<T>(pagination: Pagination<T>): boolean {
  return pagination.page >= pagination.pageCount
}