import { createSlice } from "@reduxjs/toolkit";
import {
  TicketListInitialState,
  type TicketListState,
} from "./ticket-list-state";
import { TicketListLoadFirstErrorState, TicketListLoadFirstLoadingState, TicketListLoadFirstSuccessState } from "./states/load-first-state";
import { getTickets } from "../usecases/ticket-list-use-case";

const initialState = (id: number): TicketListState => TicketListInitialState(id);

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
