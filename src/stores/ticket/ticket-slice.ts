import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Pagination } from "@/components/layout/data/pagination";
import type { Ticket } from "@/features/ticket/data/ticket";

// --------- Ticket repository store ----------

class AsyncDeduplicator<T> {
  private promise: Promise<T> | null = null;
  private abortController: AbortController | null = null;

  async fetch(fetcher: (signal?: AbortSignal) => Promise<T>): Promise<T> {
    if (this.promise) {
      return this.promise;
    }

    this.abortController = new AbortController();
    this.promise = fetcher(this.abortController.signal);

    try {
      const result = await this.promise;
      return result;
    } finally {
      this.promise = null;
      this.abortController = null;
    }
  }

  invalidate(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.promise = null;
    this.abortController = null;
  }

  cancel(): void {
    this.invalidate();
  }
}

async function fetchTicketApi(
  id: number,
  signal?: AbortSignal
): Promise<Ticket> {
  const res = await fetch(`/api/tickets/${id}`, { signal });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

async function fetchTicketsApi(params: {
  page: number;
  limit?: number;
  search?: string;
  typeId?: number;
  stateId?: number;
  stateGroupId?: number;
  stationId?: number;
  minCreateDate?: Date;
  maxCreateDate?: Date;
  handlerCode?: string;
}): Promise<Pagination<Ticket>> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.search) searchParams.set("search", params.search);
  if (params.typeId) searchParams.set("typeId", params.typeId.toString());
  if (params.stateId) searchParams.set("stateId", params.stateId.toString());
  if (params.stateGroupId)
    searchParams.set("stateGroupId", params.stateGroupId.toString());
  if (params.stationId)
    searchParams.set("stationId", params.stationId.toString());
  if (params.minCreateDate)
    searchParams.set("minCreateDate", params.minCreateDate.toISOString());
  if (params.maxCreateDate)
    searchParams.set("maxCreateDate", params.maxCreateDate.toISOString());
  if (params.handlerCode) searchParams.set("handlerCode", params.handlerCode);

  const res = await fetch(`/api/tickets?${searchParams}`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

const deduplicators = new Map<number, AsyncDeduplicator<Ticket>>();

const itemSubscribers = new Set<(ticket: Ticket) => void>();
const refreshSubscribers = new Set<(id?: number) => void>();
const clearSubscribers = new Set<() => void>();

export interface TicketRepositoryState {
  items: Record<number, Ticket>;
}

const initialState: TicketRepositoryState = {
  items: {},
};

export const getItemAsync = createAsyncThunk<
  Ticket,
  number
>(
  "ticketRepository/getItem",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const deduplicator =
        deduplicators.get(id) ?? new AsyncDeduplicator<Ticket>();
      deduplicators.set(id, deduplicator);

      const data = await deduplicator.fetch(async (signal) => {
        const dto = await fetchTicketApi(id, signal);
        dispatch(cacheItems([dto]));
        return dto;
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const getTicketsAsync = createAsyncThunk<
  Pagination<Ticket>,
  {
    page: number;
    limit?: number;
  }
>(
  "ticketRepository/getTickets",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const pagination = await fetchTicketsApi(params);
      // Cache items như Flutter
      dispatch(cacheItems(pagination.list));
      return pagination;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const ticketRepositorySlice = createSlice({
  name: "ticketRepository",
  initialState,
  reducers: {
    cacheItems: (state, action: PayloadAction<Ticket[]>) => {
      for (const ticket of action.payload) {
        state.items[ticket.id] = ticket;
        itemSubscribers.forEach((callback) => callback(ticket));
      }
    },

    refresh: (_, action: PayloadAction<number | undefined>) => {
      refreshSubscribers.forEach((callback) => callback(action.payload));

      if (action.payload) {
        getItemAsync(action.payload);
      }
    },

    clear: (state) => {
      state.items = {};
      deduplicators.clear();
      clearSubscribers.forEach((callback) => callback());
    },

    dispose: (state) => {
      state.items = {};
      deduplicators.clear();
      itemSubscribers.clear();
      refreshSubscribers.clear();
      clearSubscribers.clear();
    },
  },
});


export const { cacheItems, refresh, clear, dispose } =
  ticketRepositorySlice.actions;

export const subscribeItem = (
  id: number | undefined,
  callback: (ticket: Ticket) => void
) => {
  const wrappedCallback = (ticket: Ticket) => {
    if (!id || ticket.id === id) {
      callback(ticket);
    }
  };
  itemSubscribers.add(wrappedCallback);

  return () => {
    itemSubscribers.delete(wrappedCallback);
  };
};

export const subscribeRefresh = (callback: (id?: number) => void) => {
  refreshSubscribers.add(callback);
  return () => refreshSubscribers.delete(callback);
};

export const subscribeClear = (callback: () => void) => {
  clearSubscribers.add(callback);
  return () => clearSubscribers.delete(callback);
};

export default ticketRepositorySlice.reducer;

export const selectItem =
  (id: number) => (state: { ticketRepository: TicketRepositoryState }) =>  state.ticketRepository.items[id];

