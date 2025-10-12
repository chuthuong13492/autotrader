// import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
// import { mockApi } from '@/lib/mock-api'
// import type { Pagination } from '@/components/layout/data/pagination'
// import type { Car } from '@/features/dashboard/data/mock-data'

// // Query keys for React Query - Simplified structure
// export const carsQueryKeys = {
//   all: ['cars'] as const,
//   lists: () => [...carsQueryKeys.all, 'list'] as const,
//   list: (params: Record<string, unknown>) => [...carsQueryKeys.lists(), params] as const,
//   details: () => [...carsQueryKeys.all, 'detail'] as const,
//   detail: (id: string) => [...carsQueryKeys.details(), id] as const,
//   infinite: (params: Record<string, unknown>) => [...carsQueryKeys.all, 'infinite', params] as const,
// }

// // Hook để lấy danh sách xe với pagination (chỉ lấy basic list)
// export function useCarsQuery(page: number = 1, pageSize: number = 20, sort?: string): {
//   data: Pagination<Car> | undefined
//   isLoading: boolean
//   error: Error | null
//   refetch: () => void
// } {
//   const params = { page, pageSize, ...(sort && { sort }) }
  
//   return useQuery({
//     // eslint-disable-next-line @tanstack/query/exhaustive-deps
//     queryKey: carsQueryKeys.list(params),
//     queryFn: () => mockApi.filterCars({}, page, pageSize),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
//     select: (data) => ({
//       list: data.list,
//       page: data.page,
//       pageSize: data.pageSize,
//       pageCount: data.pageCount,
//       total: data.total,
//     }),
//     enabled: true, // Always enabled for basic query
//   })
// }

// // Hook để lấy thông tin chi tiết 1 xe
// export function useCarQuery(id: string) {
//   return useQuery({
//     queryKey: carsQueryKeys.detail(id),
//     queryFn: () => mockApi.getCarById(id),
//     enabled: !!id, // Chỉ chạy query khi có id
//     staleTime: 10 * 60 * 1000, // 10 minutes
//   })
// }

// // Hook tổng hợp để lấy danh sách xe với filter + search + pagination
// export function useFilteredCarsQuery(params: {
//   page?: number
//   pageSize?: number
//   // Search params
//   search?: string
//   // Filter params
//   make?: string
//   year?: number
//   priceMin?: number
//   priceMax?: number
//   bodyType?: string
//   transmission?: string
//   sort?: string
// }): {
//   data: Pagination<Car> | undefined
//   isLoading: boolean
//   error: Error | null
//   refetch: () => void
// } {
//   const { page = 1, pageSize = 20, search, ...filters } = params
  
//   // Clean up undefined values
//   const cleanParams = Object.fromEntries(
//     Object.entries({ page, pageSize, search, ...filters })
//       .filter(([_, value]) => value !== undefined && value !== '')
//   )

//   return useQuery({
//     // eslint-disable-next-line @tanstack/query/exhaustive-deps
//     queryKey: carsQueryKeys.list(cleanParams),
//     queryFn: async () => {
//       // Nếu có search, dùng search API
//       if (search && search.trim().length > 0) {
//         return await mockApi.filterCars({ searchQuery: search }, page, pageSize)
//       }
//       // Nếu có filters, dùng filter API
//       if (Object.keys(filters).some(key => filters[key as keyof typeof filters] !== undefined)) {
//         return await mockApi.filterCars(filters, page, pageSize)
//       }
//       // Mặc định dùng getCars
//       return await mockApi.getCars(page, pageSize, filters.sort)
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     select: (data) => ({
//       list: data.list,
//       page: data.page,
//       pageSize: data.pageSize,
//       pageCount: data.pageCount,
//       total: data.total,
//     }),
//   })
// }

// // Hook để lấy danh sách xe với infinite scroll
// export function useInfiniteCarsQuery(params: {
//   search?: string
//   make?: string
//   year?: number
//   priceMin?: number
//   priceMax?: number
//   bodyType?: string
//   transmission?: string
//   sort?: string
// } = {}) {
//   const { search, ...filters } = params
  
//   // Clean up undefined values
//   const cleanParams = Object.fromEntries(
//     Object.entries(params)
//       .filter(([_, value]) => value !== undefined && value !== '')
//   )

//   return useInfiniteQuery({
//     // eslint-disable-next-line @tanstack/query/exhaustive-deps
//     queryKey: carsQueryKeys.infinite(cleanParams),
//     queryFn: async ({ pageParam = 1 }) => {
//       // Nếu có search, dùng search API
//       if (search && search.trim().length > 0) {
//         return await mockApi.filterCars({ searchQuery: search }, pageParam, 20)
//       }
//       // Nếu có filters, dùng filter API
//       if (Object.keys(filters).some(key => filters[key as keyof typeof filters] !== undefined)) {
//         return await mockApi.filterCars(filters, pageParam, 20)
//       }
//       // Mặc định dùng getCars
//       return await mockApi.getCars(pageParam, 20, filters.sort)
//     },
//     getNextPageParam: (lastPage) => {
//       return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
//     },
//     initialPageParam: 1,
//     staleTime: 5 * 60 * 1000,
//     select: (data) => ({
//       pages: data.pages.map(page => ({
//         list: page.data,
//         page: page.page,
//         pageSize: page.pageSize,
//         pageCount: page.totalPages,
//         total: page.total,
//       })),
//       pageParams: data.pageParams,
//     }),
//   })
// }

// // Utility hook để prefetch car detail
// export function usePrefetchCar() {
//   const queryClient = useQueryClient()
  
//   return (id: string) => {
//     queryClient.prefetchQuery({
//       queryKey: carsQueryKeys.detail(id),
//       queryFn: () => mockApi.getCarById(id),
//       staleTime: 10 * 60 * 1000,
//     })
//   }
// }

// // Hook để invalidate cache khi cần refresh data
// export function useInvalidateCars() {
//   const queryClient = useQueryClient()
  
//   return {
//     invalidateAll: () => queryClient.invalidateQueries({ queryKey: carsQueryKeys.all }),
//     invalidateLists: () => queryClient.invalidateQueries({ queryKey: carsQueryKeys.lists() }),
//     invalidateDetail: (id: string) => queryClient.invalidateQueries({ queryKey: carsQueryKeys.detail(id) }),
//   }
// }
