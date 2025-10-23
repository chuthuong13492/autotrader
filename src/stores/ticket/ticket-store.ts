// stores/ticket/ticket-store.ts
import { configureStore } from "@reduxjs/toolkit";
import { ticketApi } from "@/stores/ticket/ticket-api";

export const ticketStore = configureStore({
  reducer: {
    [ticketApi.reducerPath]: ticketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ticketApi.middleware),
});

export type TicketStoreState = ReturnType<typeof ticketStore.getState>;
export type TicketStoreDispatch = typeof ticketStore.dispatch;