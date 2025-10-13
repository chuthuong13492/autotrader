import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import { type FormData } from "@/features/dashboard/components/dashboard-filter"
import { type Car } from "@/features/dashboard/data/mock-data"
import {
  type Pagination,
  copyWithPagination,
  emptyPagination,
} from "@/components/layout/data/pagination"
import { updatePage } from "@/lib/utils"
import { mockApi } from "@/lib/mock-api"

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"
  | "mileage-desc";

export interface DashboardState {
  values: Partial<FormData>
  search?: string
  sort: SortKey
  pagination: Pagination<Car>
}

export const initialState: DashboardState = {
  search: "",
  sort: "relevance",
  values: {
    minPrice: "",
    maxPrice: "",
    selectedMakes: "",
    selectedModels: "",
    selectedTrims: "",
    selectedBodyTypes: [],
    selectedTransmission: "All",
  },
  pagination: emptyPagination(),
}

export const setSortAsync = createAsyncThunk(
  "dashboard/setSort",
  async (sortKey: SortKey, { getState }) => {
    const state = getState() as { dashboard: DashboardState }
    const { values, search } = state.dashboard

    const result = await mockApi.filterCars(
      {
        searchQuery: search,
        selectedMakes: values.selectedMakes,
        selectedModels: values.selectedModels,
        selectedTrims: values.selectedTrims,
        selectedBodyTypes: values.selectedBodyTypes,
        selectedTransmission:
          values.selectedTransmission === "All"
            ? undefined
            : (values.selectedTransmission ?? undefined),
        priceMin: values.minPrice ? Number(values.minPrice) : undefined,
        priceMax: values.maxPrice ? Number(values.maxPrice) : undefined,
        sortKey: sortKey,
      },
      1,
      20
    )

    return {
      sort: sortKey,
      pagination: result,
    }
  }
)

export const filterPageAsync = createAsyncThunk(
  "dashboard/filterPage",
  async (formData: Partial<FormData>, { getState }) => {
    const state = getState() as { dashboard: DashboardState }
    const { search, sort } = state.dashboard

    const result = await mockApi.filterCars(
      {
        searchQuery: search,
        selectedMakes: formData.selectedMakes,
        selectedModels: formData.selectedModels,
        selectedTrims: formData.selectedTrims,
        selectedBodyTypes: formData.selectedBodyTypes,
        selectedTransmission:
          formData.selectedTransmission === "All"
            ? undefined
            : (formData.selectedTransmission ?? undefined),
        priceMin: formData.minPrice ? Number(formData.minPrice) : undefined,
        priceMax: formData.maxPrice ? Number(formData.maxPrice) : undefined,
        sortKey: sort,
      },
      1,
      20
    )

    return {
      values: formData,
      pagination: result,
    }
  }
)

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<Partial<DashboardState>>) {
      if (action.payload.search !== undefined) {
        state.search = action.payload.search
      }
      if (action.payload.values !== undefined) {
        state.values = action.payload.values
      }
      if (action.payload.sort !== undefined) {
        state.sort = action.payload.sort
      }
    },
    setForm(state, action: PayloadAction<Partial<FormData>>) {
      state.values = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.pagination = action.payload
      // eslint-disable-next-line no-console
      console.log("fetchPage", action.payload)
    })

    builder.addCase(setSortAsync.fulfilled, (state, action) => {
      state.sort = action.payload.sort
      state.pagination = action.payload.pagination
      // eslint-disable-next-line no-console
      console.log("setSortAsync", action.payload)
    })

    builder.addCase(setSortAsync.rejected, (_, action) => {
      // eslint-disable-next-line no-console
      console.error("setSortAsync failed:", action.error)
    })

    builder.addCase(filterPageAsync.fulfilled, (state, action) => {
      state.values = action.payload.values
      state.pagination = action.payload.pagination
      // eslint-disable-next-line no-console
      console.log("filterPageAsync", action.payload)
    })

    builder.addCase(filterPageAsync.rejected, (_, action) => {
      // eslint-disable-next-line no-console
      console.error("filterPageAsync failed:", action.error)
    })

    builder.addCase(searchAsync.fulfilled, (state, action) => {
      state.search = action.payload.search
      state.pagination = action.payload.pagination
      // eslint-disable-next-line no-console
      console.log("searchAsync", action.payload)
    })

    builder.addCase(searchAsync.rejected, (_, action) => {
      // eslint-disable-next-line no-console
      console.error("searchAsync failed:", action.error)
    })

    builder.addCase(getSimilarCars.fulfilled, (_, action) => {
      // eslint-disable-next-line no-console
      console.log("getSimilarCars", action.payload)
    })
  },
});

export const searchAsync = createAsyncThunk(
  "dashboard/search",
  async (searchQuery: string, { getState }) => {
    const state = getState() as { dashboard: DashboardState }
    const { values, sort } = state.dashboard

    const result = await mockApi.filterCars(
      {
        searchQuery: searchQuery,
        selectedMakes: values.selectedMakes,
        selectedModels: values.selectedModels,
        selectedTrims: values.selectedTrims,
        priceMin: values.minPrice ? Number(values.minPrice) : undefined,
        priceMax: values.maxPrice ? Number(values.maxPrice) : undefined,
        selectedBodyTypes: values.selectedBodyTypes,
        selectedTransmission:
          values.selectedTransmission === "All"
            ? undefined
            : (values.selectedTransmission ?? undefined),
        sortKey: sort,
      },
      1,
      20
    )

    return {
      search: searchQuery,
      pagination: result,
    }
  }
)

export const fetchPage = createAsyncThunk(
  "dashboard/fetchPage",
  async ({
    page,
    values,
    sort,
    search,
    pagination,
  }: {
    page: number
    values: Partial<FormData>
    sort: SortKey
    search: string
    pagination: Pagination<Car>
  }) => {
    const result = await mockApi.filterCars(
      {
        sortKey: sort,
        selectedMakes: values.selectedMakes,
        selectedModels: values.selectedModels,
        selectedTrims: values.selectedTrims,
        selectedBodyTypes: values.selectedBodyTypes,
        selectedTransmission:
          values.selectedTransmission === "All"
            ? undefined
            : (values.selectedTransmission ?? undefined),
        priceMin: values.minPrice ? Number(values.minPrice) : undefined,
        priceMax: values.maxPrice ? Number(values.maxPrice) : undefined,
        searchQuery: search,
      },
      page,
      20
    )

    return updatePage(pagination, result)
  }
)

export const getSimilarCars = createAsyncThunk(
  "dashboard/getSimilarCarsById",
  async ({ page, id }: { page: number; id?: string }, { getState }) => {
    const state = getState() as { dashboard: DashboardState }

    const vehicle = await mockApi.getCarById(id)

    if (!vehicle) {
      return copyWithPagination(state.dashboard.pagination, {
        error: "Vehicle not found",
      })
    }

    const result = await mockApi.filterCars(
      {
        sortKey: state.dashboard.sort,
        selectedMakes: vehicle?.make,
        searchQuery: state.dashboard.search,
      },
      page,
      10
    )

    return result
  }
)

export const { setState, setForm } = dashboardSlice.actions
export default dashboardSlice.reducer
