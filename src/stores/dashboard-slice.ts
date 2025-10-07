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
  emptyPagination,
} from "@/components/layout/data/pagination";
import { updatePage, delay } from "@/lib/utils";

function getPagination(
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
  isEmpty: boolean | null;
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
  isEmpty: null
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
      // Apply filters and pagination
      const paginationResult = getPagination(
        ALL_CARS,
        state.values,
        state.search ?? "",
        state.sort,
        1, // page
        20 // pageSize
      );

      state.pagination = paginationResult;

      state.isEmpty = paginationResult.total === 0

      // eslint-disable-next-line no-console
      console.log("Set sort", state.pagination);
    },
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
    filterPage(state, action: PayloadAction<Partial<FormData>>) {
      //SET FORM
      state.values = action.payload;

      // Apply filters and pagination
      const paginationResult = getPagination(
        ALL_CARS,
        state.values,
        state.search ?? "",
        state.sort,
        1, // page
        20 // pageSize
      );

      state.pagination = paginationResult;

      state.isEmpty = paginationResult.total === 0

      // eslint-disable-next-line no-console
      console.log("filterPage", state.pagination);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.pagination = action.payload;

      state.isEmpty = action.payload.total === 0
      // eslint-disable-next-line no-console
      console.log("fetchPage", action.payload);
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

export const { setSort, setSearch, setState, filterPage, setForm } = dashboardSlice.actions;
export default dashboardSlice.reducer;
