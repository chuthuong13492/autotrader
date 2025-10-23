import { configureStore } from '@reduxjs/toolkit';
import  { ticketListReducer } from './ticket-list-slice';

// Configure Redux store
export const createTicketListStore = (id: number) => configureStore({
  reducer: ticketListReducer(id),
});

export type RootState = ReturnType<ReturnType<typeof createTicketListStore>['getState']>;
export type AppDispatch = ReturnType<typeof createTicketListStore>['dispatch'];
