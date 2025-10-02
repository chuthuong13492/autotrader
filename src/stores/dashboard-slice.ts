import { createSlice, type PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'
import { type FormData } from '@/features/dashboard/components/dashboard-filter'
import { applyFilters } from '@/features/dashboard/data/filter-data'
import { ALL_CARS, PAGE_COUNT, PAGE_SIZE, TOTAL, type Car } from '@/features/dashboard/data/mock-data'
import { type Pagination, emptyPagination } from '@/components/layout/data/pagination'
import { updatePage } from '@/lib/utils'
export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc' | 'mileage-asc' | 'mileage-desc'

interface DashboardState {
  values: Partial<FormData> & { isDirty: boolean }
  search?: string
  sort?: SortKey
  pagination: Pagination<Car>
}

const initialState: DashboardState = {
  search: '',
  sort: 'relevance',
  values: {
    minPrice: '',
    maxPrice: '',
    selectedMakes: [],
    selectedModels: [],
    selectedTrims: [],
    selectedBodyTypes: [],
    selectedTransmission: 'All',
    isDirty: false,
  },
  pagination:  emptyPagination(),
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setForm(state, action: PayloadAction<Partial<FormData> & { isDirty: boolean }>) {
      state.values = { ...state.values, ...action.payload }
    },
    filterPage(state, action: PayloadAction<number | null>) {
      const page = action.payload ?? 1
      const filters = state.values
    
      const safePage = Math.min(Math.max(page, 1), PAGE_COUNT)
      const start = (safePage - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
    
      const list = applyFilters(ALL_CARS.slice(start, end), {
        selectedMakes: filters.selectedMakes ?? [],
        selectedModels: filters.selectedModels ?? [],
        selectedTrims: filters.selectedTrims ?? [],
        priceMin: filters.minPrice ? Number(filters.minPrice) : 0,
        priceMax: filters.maxPrice ? Number(filters.maxPrice) : Number.MAX_SAFE_INTEGER,
        selectedBodyTypes: filters.selectedBodyTypes ?? [],
        selectedTransmission: filters.selectedTransmission === 'All' ? null : filters.selectedTransmission ?? null,
        searchQuery: state.search ?? '',
      })
    
      state.pagination = ({
        list,
        page: safePage,
        pageSize: PAGE_SIZE,
        pageCount: PAGE_COUNT,
        total: TOTAL,
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.pagination = action.payload
    })
  }
})

export const fetchPage = createAsyncThunk(
  'dashboard/fetchPage',
  async (page: number, { getState }) => {
    const state = getState() as { dashboard: DashboardState }
    const filters = state.dashboard.values

    const safePage = Math.min(Math.max(page, 1), PAGE_COUNT)
    const start = (safePage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE


    const list = applyFilters(ALL_CARS.slice(start, end), {
      selectedMakes: filters.selectedMakes ?? [],
      selectedModels: filters.selectedModels ?? [],
      selectedTrims: filters.selectedTrims ?? [],
      priceMin: filters.minPrice ? Number(filters.minPrice) : 0,
      priceMax: filters.maxPrice ? Number(filters.maxPrice) : 0,
      selectedBodyTypes: filters.selectedBodyTypes ?? [],
      selectedTransmission: filters.selectedTransmission === 'All' ? null : filters.selectedTransmission ?? null,
      searchQuery: state.dashboard.search ?? '',
    })

    return updatePage(state.dashboard.pagination, {
      list,
      page: safePage,
      pageSize: PAGE_SIZE,
      pageCount: PAGE_COUNT,
      total: TOTAL,
    })
  }
)

export const { setSort, setForm, setSearch, filterPage } = dashboardSlice.actions
export default dashboardSlice.reducer