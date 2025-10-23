import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TicketListInitialState,
  type TicketListState,
} from "./ticket-list-state";
import type { Pagination } from "@/components/layout/data/pagination";
import { type Either, Right } from "@/components/layout/data/either";
import type { FailureType } from "@/components/layout/data/failure";
import { execute } from "@/lib/execute";
import type { Ticket } from "@/features/ticket/data/ticket";
import { TicketListLoadFirstErrorState, TicketListLoadFirstLoadingState, TicketListLoadFirstSuccessState } from "./states/load-first-state";

const initialState = (id: number): TicketListState => TicketListInitialState(id);

export const loadTicketsAsync = createAsyncThunk<
  Either<FailureType, Pagination<Ticket>>
>(
  "ticketList/loadTickets",
  async (): Promise<Either<FailureType, Pagination<Ticket>>> => {
    return execute(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockTickets: Ticket[] = [
          {
            id: 1,
            title: "Ticket 1",
            state: "open",
          },
          {
            id: 2,
            title: "Ticket 2",
            state: "closed",
          },
          {
            id: 3,
            title: "Ticket 3",
            state: "pending",
          },
        ];
        return Right({
          list: mockTickets,
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: mockTickets.length,
        });
      },
      {
        funcTitle: "loadTickets",
        errorMessage: "Failed to load tickets",
      }
    );
  }
);

const ticketListSlice = (id: number) => createSlice({
  name: "ticketList",
  initialState: initialState(id),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTicketsAsync.pending, (state) =>
        TicketListLoadFirstLoadingState(state)
      )
      .addCase(loadTicketsAsync.fulfilled, (state, action) =>
        action.payload.fold(
          (failure) => TicketListLoadFirstErrorState(state, failure),
          (pagination) => TicketListLoadFirstSuccessState(state, pagination)
        )
      );
  },
});

export const ticketListReducer = (id: number) => ticketListSlice(id).reducer;
