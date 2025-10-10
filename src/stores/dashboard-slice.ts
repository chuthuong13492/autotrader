import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { type FormData } from "@/features/dashboard/components/dashboard-filter";
import { applyFilters } from "@/features/dashboard/data/filter-data";
import { ALL_CARS, type Car } from "@/features/dashboard/data/mock-data";
import {
  type Pagination,
  copyWithPagination,
  emptyPagination,
} from "@/components/layout/data/pagination";
import { updatePage, delay } from "@/lib/utils";

export function getPagination(
  cars: Car[],
  filters: Partial<FormData>,
  search: string,
  sort: SortKey,
  page: number = 1,
  pageSize: number = 20
) {
  const filteredCars = applyFilters(cars, {
    selectedMakes: filters.selectedMakes ?? "",
    selectedModels: filters.selectedModels ?? "",
    selectedTrims: filters.selectedTrims ?? "",
    priceMin: filters.minPrice ? Number(filters.minPrice) : 0,
    priceMax: filters.maxPrice
      ? Number(filters.maxPrice)
      : Number.MAX_SAFE_INTEGER,
    selectedBodyTypes: filters.selectedBodyTypes ?? [],
    selectedTransmission:
      filters.selectedTransmission === "All"
        ? null
        : (filters.selectedTransmission ?? null),
    searchQuery: search ?? "",
    sortKey: sort,
  });

  const total = filteredCars.length;
  const pageCount = Math.ceil(total / pageSize);
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const list = filteredCars.slice(start, end);

  return {
    list,
    page: safePage,
    pageSize,
    pageCount,
    total,
  };
}

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"
  | "mileage-desc";

export interface DashboardState {
  values: Partial<FormData>;
  search?: string;
  sort: SortKey;
  pagination: Pagination<Car>;
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
};

// Async thunk for setting sort
export const setSortAsync = createAsyncThunk(
  'dashboard/setSort',
  async (sortKey: SortKey, { getState }) => {
    const state = getState() as { dashboard: DashboardState };
    const { values, search } = state.dashboard;
    
    const paginationResult = getPagination(
      ALL_CARS,
      values,
      search ?? "",
      sortKey,
      1, // page
      20 // pageSize
    );

    return {
      sort: sortKey,
      pagination: paginationResult
    };
  }
);

// Async thunk for filtering page
export const filterPageAsync = createAsyncThunk(
  'dashboard/filterPage',
  async (formData: Partial<FormData>, { getState }) => {
    const state = getState() as { dashboard: DashboardState };
    const { search, sort } = state.dashboard;
    
    const paginationResult = getPagination(
      ALL_CARS,
      formData,
      search ?? "",
      sort,
      1, // page
      20 // pageSize
    );

    return {
      values: formData,
      pagination: paginationResult
    };
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setState(state, action: PayloadAction<Partial<DashboardState>>) {
      // Update state với data từ action
      if (action.payload.search !== undefined) {
        state.search = action.payload.search;
      }
      if (action.payload.values !== undefined) {
        state.values = action.payload.values;
      }
      if (action.payload.sort !== undefined) {
        state.sort = action.payload.sort;
      }
    },
    setForm(state, action: PayloadAction<Partial<FormData>>) {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.pagination = action.payload;

      // eslint-disable-next-line no-console
      console.log("fetchPage", action.payload);
    });
    
    builder.addCase(setSortAsync.fulfilled, (state, action) => {
      state.sort = action.payload.sort;
      state.pagination = action.payload.pagination;

      // eslint-disable-next-line no-console
      console.log("setSortAsync", action.payload);
    });
    
    builder.addCase(setSortAsync.rejected, (_, action) => {
      // Handle error if needed
      // eslint-disable-next-line no-console
      console.error("setSortAsync failed:", action.error);
    });
    
    builder.addCase(filterPageAsync.fulfilled, (state, action) => {
      state.values = action.payload.values;
      state.pagination = action.payload.pagination;

      // eslint-disable-next-line no-console
      console.log("filterPageAsync", action.payload);
    });
    
    builder.addCase(filterPageAsync.rejected, (_, action) => {
      // Handle error if needed
      // eslint-disable-next-line no-console
      console.error("filterPageAsync failed:", action.error);
    });
    
    builder.addCase(getSimilarCars.fulfilled, (_, action) => {
      // state.pagination = updatePage(state.pagination, action.payload);

      // eslint-disable-next-line no-console
      console.log("getSimilarCars", action.payload);
    });
  },
});

export const fetchPage = createAsyncThunk(
  "dashboard/fetchPage",
  async (page: number, { getState }) => {
    await delay(2000);

    const state = getState() as { dashboard: DashboardState };

    // Apply filters and pagination
    const paginationResult = getPagination(
      ALL_CARS,
      state.dashboard.values,
      state.dashboard.search ?? "",
      state.dashboard.sort,
      page,
      20 // pageSize
    );

    return updatePage(state.dashboard.pagination, paginationResult);
  }
);

export const getSimilarCars = createAsyncThunk(
  "dashboard/getSimilarCarsById",
  async ({ page, id }: { page: number; id?: string }, { getState }) => {
    await delay(2000);

    const state = getState() as { dashboard: DashboardState };

    const vehicle = ALL_CARS.find((car) => car.id === id);

    if(!vehicle){
      return copyWithPagination(state.dashboard.pagination, { error: "Vehicle not found" })
    }

    // Apply filters and pagination
    const paginationResult = getPagination(
      ALL_CARS,
      {
        selectedMakes: vehicle?.make,
      },
      state.dashboard.search ?? "",
      state.dashboard.sort,
      page,
      10 // pageSize
    );

    return paginationResult;
  }
);

export const { setSearch, setState, setForm } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
