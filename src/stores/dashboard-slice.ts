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

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"
  | "mileage-desc";

interface DashboardState {
  values: Partial<FormData>;
  search?: string;
  sort?: SortKey;
  pagination: Pagination<Car>;
}

const initialState: DashboardState = {
  search: "",
  sort: "relevance",
  values: {
    minPrice: "",
    maxPrice: "",
    selectedMakes: [],
    selectedModels: [],
    selectedTrims: [],
    selectedBodyTypes: [],
    selectedTransmission: "All",
  },
  pagination: emptyPagination(),
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setForm(state, action: PayloadAction<Partial<FormData>>) {
      state.values = { ...state.values, ...action.payload };
    },
    filterPage(state, action: PayloadAction<number | null>) {
      const page = action.payload ?? 1;
      const filters = state.values;

      const filteredCars = applyFilters(ALL_CARS, {
        selectedMakes: filters.selectedMakes ?? [],
        selectedModels: filters.selectedModels ?? [],
        selectedTrims: filters.selectedTrims ?? [],
        priceMin: filters.minPrice ? Number(filters.minPrice) : 0,
        priceMax: filters.maxPrice
          ? Number(filters.maxPrice)
          : Number.MAX_SAFE_INTEGER,
        selectedBodyTypes: filters.selectedBodyTypes ?? [],
        selectedTransmission:
          filters.selectedTransmission === "All"
            ? null
            : (filters.selectedTransmission ?? null),
        searchQuery: state.search ?? "",
      });

      const total = filteredCars.length;
      const pageSize = 20;
      const pageCount = Math.ceil(total / pageSize);

      const safePage = Math.min(Math.max(page, 1), pageCount);
      const start = (safePage - 1) * pageSize;
      const end = start + pageSize;
      const list = filteredCars.slice(start, end);

      state.pagination = {
        list,
        page: safePage,
        pageSize,
        pageCount,
        total,
      };

      // eslint-disable-next-line no-console
      console.log("filterPage", state.pagination);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.pagination = action.payload;
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
    const filters = state.dashboard.values;

    const filteredCars = applyFilters(ALL_CARS, {
      selectedMakes: filters.selectedMakes ?? [],
      selectedModels: filters.selectedModels ?? [],
      selectedTrims: filters.selectedTrims ?? [],
      priceMin: filters.minPrice ? Number(filters.minPrice) : 0,
      priceMax: filters.maxPrice ? Number(filters.maxPrice) : 0,
      selectedBodyTypes: filters.selectedBodyTypes ?? [],
      selectedTransmission:
        filters.selectedTransmission === "All"
          ? null
          : (filters.selectedTransmission ?? null),
      searchQuery: state.dashboard.search ?? "",
    });

    const total = filteredCars.length;
    const pageSize = 20;
    const pageCount = Math.ceil(total / pageSize);

    const safePage = Math.min(Math.max(page, 1), pageCount);
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    const list = filteredCars.slice(start, end);

    return updatePage(state.dashboard.pagination, {
      list,
      page: safePage,
      pageSize,
      pageCount,
      total,
    });
  }
);

export const { setSort, setForm, setSearch, filterPage } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
