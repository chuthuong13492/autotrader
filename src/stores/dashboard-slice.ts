import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {  type FormData } from '@/features/dashboard/components/dashboard-filter'
export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc' | 'mileage-asc' | 'mileage-desc'

interface DashboardState {
  values: Partial<FormData> & {  isDirty: boolean},
  search?: string,
  sort?: SortKey
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
}

// Update reducers to handle new state structure
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload
    },
    setSearch(state, action: PayloadAction<string>){
      state.search = action.payload
    },
    setForm(state, action: PayloadAction<Partial<FormData> & { isDirty: boolean }>) {
      state.values = { ...state.values, ...action.payload }
    },
  },
})

export const {
  setSort,
  setForm,
  setSearch,
} = dashboardSlice.actions

export default dashboardSlice.reducer

