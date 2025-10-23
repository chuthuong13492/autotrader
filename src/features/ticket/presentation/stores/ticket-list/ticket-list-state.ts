import {
  emptyPagination,
  type Pagination,
} from "@/components/layout/data/pagination";
import type { Ticket } from "@/features/ticket/models/ticket";
import type { BaseState } from "@/stores/common-states";

export enum TicketListType {
  Initial = "TicketListInitial",
  LoadFirstLoading = "TicketListLoadFirstLoadingState",
  LoadFirstSuccess = "TicketListLoadFirstSuccessState",
  LoadFirstError = "TicketListLoadFirstErrorState",
}

export interface TicketListState extends BaseState<TicketListType> {
  pagination: Pagination<Ticket>;
  id: number;
}

// --- Initial state ---
export const TicketListInitialState = (id: number): TicketListState => ({
  type: TicketListType.Initial,
  pagination: emptyPagination(),
  id,
});


export const _TicketListState = (
  state: TicketListState,
  type: TicketListType,
  pagination?: Pagination<Ticket>
): TicketListState => ({
  id: state.id,
  pagination: pagination ?? state.pagination,
  type,
});