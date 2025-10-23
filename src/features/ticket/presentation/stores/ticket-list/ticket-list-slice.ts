import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TicketListInitialState,
  type TicketListState,
} from "./ticket-list-state";
import { TicketListLoadFirstErrorState, TicketListLoadFirstLoadingState, TicketListLoadFirstSuccessState } from "./states/load-first-state";
import { TicketListUseCase } from "../../../domain/usecases/ticket-list-use-case";
import type { Pagination } from "@/components/layout/data/pagination";
import { type Either } from "@/components/layout/data/either";
import type { FailureType } from "@/components/layout/data/failure";
import type { Ticket } from "@/features/ticket/models/ticket";

const initialState = (id: number): TicketListState => TicketListInitialState(id);

export const getTickets = createAsyncThunk<
  Either<FailureType, Pagination<Ticket>>
>(
  "ticketList/loadTickets",
  async (): Promise<Either<FailureType, Pagination<Ticket>>> => {
    return TicketListUseCase.loadTickets() ;
  }
);

const ticketListSlice = (id: number) => createSlice({
  name: "ticketList",
  initialState: initialState(id),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) =>
        TicketListLoadFirstLoadingState(state)
      )
      .addCase(getTickets.fulfilled, (state, action) =>
        action.payload.fold(
          (failure) => TicketListLoadFirstErrorState(state, failure),
          (pagination) => TicketListLoadFirstSuccessState(state, pagination)
        )
      );
  },
});

export const ticketListReducer = (id: number) => ticketListSlice(id).reducer;
