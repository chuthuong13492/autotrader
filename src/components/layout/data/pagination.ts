export class Pagination<T> {
    constructor(params: {
      list: T[]
      page: number
      pageSize: number
      pageCount: number
      total: number
      error?: string | null
    }) {
      this.list = params.list
      this.page = params.page
      this.pageSize = params.pageSize
      this.pageCount = params.pageCount
      this.total = params.total
      this.error = params.error
    }
  
    static empty<U>(): Pagination<U> {
      return new Pagination<U>({ list: [], page: 0, pageSize: 0, pageCount: 0, total: 0 })
    }
  
    list: T[]
    page: number
    pageSize: number
    pageCount: number
    total: number
    get isLast(): boolean {
      return this.page >= this.pageCount
    }
    error?: string | null
  
    toString(): string {
      return `Pagination(list: [${this.list.map((e) => String(e)).join(', ')}], page: ${this.page}, pageSize: ${this.pageSize}, pageCount: ${this.pageCount}, total: ${this.total})`
    }
  
    copyWith(params: Partial<Pagination<T>> & { list?: T[] }): Pagination<T> {
      return new Pagination<T>({
        list: params.list ?? this.list,
        page: params.page ?? this.page,
        pageSize: params.pageSize ?? this.pageSize,
        pageCount: params.pageCount ?? this.pageCount,
        total: params.total ?? this.total,
        error: params.error ?? this.error,
      })
    }
  }