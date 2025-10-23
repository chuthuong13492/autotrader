import type { Pagination } from "@/components/layout/data/pagination";
import {
  _TicketListState,
  TicketListType,
  type TicketListState,
} from "../ticket-list-state";
import type { Ticket } from "../../data/ticket";
import type { FailureType } from "@/components/layout/data/failure";
import type { ErrorState } from "@/stores/common-states";

export interface TicketListLoadFirstErrorState extends TicketListState, ErrorState {}

export const TicketListLoadFirstLoadingState = (
  state: TicketListState
): TicketListState =>
  _TicketListState(state, TicketListType.LoadFirstLoading);

export const TicketListLoadFirstSuccessState = (
  state: TicketListState,
  pagination: Pagination<Ticket>
) : TicketListState => _TicketListState(state, TicketListType.LoadFirstSuccess, pagination);

export const TicketListLoadFirstErrorState = (
  state: TicketListState,
  error: FailureType
): TicketListLoadFirstErrorState => ({
  ..._TicketListState(state, TicketListType.LoadFirstError),
  error,
});
