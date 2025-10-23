import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Pagination } from "@/components/layout/data/pagination";
import type { Ticket } from "@/features/ticket/data/ticket";
import {
  type AsyncDeduplicator,
  deduplicateFetch,
} from "@/lib/async-deduplicator";
import {
  fetchTicketApi,
  fetchTicketsApi,
} from "./usecases/ticket-repository-use-case";
import { Right, type Either } from "@/components/layout/data/either";
import type { FailureType } from "@/components/layout/data/failure";
import { execute } from "@/lib/execute";
import { Subscribe } from "@/lib/subscribe";

// --------- Ticket repository store ----------

const deduplicators = new Map<number, AsyncDeduplicator<Ticket>>();

export const itemSubscribes = new Subscribe<Ticket>();
export const refreshSubscribes = new Subscribe<number | undefined>();
export const clearSubscribes = new Subscribe<void>();

export interface TicketRepositoryState {
  items: Record<number, Ticket>;
}

const initialState: TicketRepositoryState = {
  items: {},
};

export const getItemAsync = createAsyncThunk<
  Either<FailureType, Ticket>,
  number
>(
  "ticketRepository/getItem",
  async (id): Promise<Either<FailureType, Ticket>> => {
    return execute(
      async () => {
        const data = await deduplicateFetch<Ticket>(
          deduplicators,
          id,
          async (signal) => {
            return await fetchTicketApi(id, signal);
          }
        );

        return Right(data);
      },
      {
        funcTitle: "getItem",
        errorMessage: "Failed to load item",
      }
    );
  }
);

export const getTicketsAsync = createAsyncThunk<
  Either<FailureType, Pagination<Ticket>>,
  {
    page: number;
    limit?: number;
  }
>(
  "ticketRepository/getTickets",
  async (params): Promise<Either<FailureType, Pagination<Ticket>>> => {
    return execute(
      async () => {
        const pagination = await fetchTicketsApi(params);
        return Right(pagination);
      },
      {
        funcTitle: "getTickets",
        errorMessage: "Failed to load tickets",
      }
    );
  }
);

const cacheItems = (items: Record<number, Ticket>, list: Ticket[]) => {
  for (const ticket of list) {
    items[ticket.id] = ticket;
    itemSubscribes.publish(ticket);
  }
};

const dispose = () => {
  deduplicators.clear();
  itemSubscribes.clear();
  refreshSubscribes.clear();
  clearSubscribes.clear();
};

export const ticketRepositorySlice = createSlice({
  name: "ticketRepository",
  initialState,
  reducers: {
    refresh: (_, action: PayloadAction<number | undefined>) => {
      refreshSubscribes.publish(action.payload);
    },

    clear: (state) => {
      state.items = {};
      deduplicators.clear();
      clearSubscribes.publish();
    },

    unmount: (state) => {
      state.items = {};
      dispose();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsAsync.fulfilled, (state, action) => {
        action.payload.fold(
          (failure) => {
            // eslint-disable-next-line no-console
            console.error("getTicketsAsync failed:", failure.message);
            state.items = {};
            dispose();
          },
          (pagination) => {
            cacheItems(state.items, pagination.list);
          }
        );
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        action.payload.fold(
          (failure) => {
            // eslint-disable-next-line no-console
            console.error("getItemAsync failed:", failure.message);
          },
          (ticket) => {
            cacheItems(state.items, [ticket]);
          }
        );
      });
  },
});

export const { refresh, clear, unmount } = ticketRepositorySlice.actions;

export const subscribeItem = (
  id: number | undefined,
  callback: (ticket: Ticket) => void
) => {
  const wrappedCallback = (ticket: Ticket) => {
    if (!id || ticket.id === id) {
      callback(ticket);
    }
  };
  return itemSubscribes.subscribe(wrappedCallback);
};

export const subscribeRefresh = (callback: (id?: number) => void) =>
  refreshSubscribes.subscribe(callback);

export const subscribeClear = (callback: () => void) =>
  clearSubscribes.subscribe(callback);

export default ticketRepositorySlice.reducer;

export const selectItem =
  (id: number) => (state: { ticketRepository: TicketRepositoryState }) =>
    state.ticketRepository.items[id];

export const selectItems = (state: {
  ticketRepository: TicketRepositoryState;
}) => state.ticketRepository.items;
