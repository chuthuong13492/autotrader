import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc' | 'mileage-asc' | 'mileage-desc'

export type DashboardFilters = {
  search: string
  brands: string[]
  bodyTypes: string[]
  transmission?: 'Automatic' | 'Manual' | 'All'
  priceMin?: number
  priceMax?: number
  sort: SortKey
  page: number
}

const initialState: DashboardFilters = {
  search: '',
  brands: [],
  bodyTypes: [],
  transmission: 'All',
  priceMin: undefined,
  priceMax: undefined,
  sort: 'relevance',
  page: 1,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    toggleBrand(state, action: PayloadAction<string>) {
      const v = action.payload
      state.page = 1
      state.brands = state.brands.includes(v)
        ? state.brands.filter((b) => b !== v)
        : [...state.brands, v]
    },
    toggleBodyType(state, action: PayloadAction<string>) {
      const v = action.payload
      state.page = 1
      state.bodyTypes = state.bodyTypes.includes(v)
        ? state.bodyTypes.filter((b) => b !== v)
        : [...state.bodyTypes, v]
    },
    setTransmission(state, action: PayloadAction<'Automatic' | 'Manual' | 'All'>) {
      state.transmission = action.payload
      state.page = 1
    },
    setPrice(state, action: PayloadAction<{ min?: number; max?: number }>) {
      state.priceMin = action.payload.min
      state.priceMax = action.payload.max
      state.page = 1
    },
    resetFilters() {
      return initialState
    },
  },
})

export const {
  setSearch,
  setSort,
  setPage,
  toggleBrand,
  toggleBodyType,
  setTransmission,
  setPrice,
  resetFilters,
} = dashboardSlice.actions

export default dashboardSlice.reducer

