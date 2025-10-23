import { configureStore } from "@reduxjs/toolkit";
import  ticketRepositoryReducer from './ticket-slice';

export const store = configureStore({
  reducer: {
    ticketRepository: ticketRepositoryReducer,
  },
});

export type TicketDispatch = typeof store.dispatch;
export type TicketRepositoryState = ReturnType<typeof store.getState>;