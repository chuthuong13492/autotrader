import { useSelector } from "react-redux";
import type { RootState } from "../store/ticket-list-store";
import type { BaseState, ErrorState } from "@/stores/common-states";

function isLoadingState(state: BaseState) {
  return state.type.endsWith("LoadingState");
}

function isErrorState(state: BaseState): state is BaseState & ErrorState {
  return state.type.endsWith("ErrorState");
}

export function useTicketList() {
    const state = useSelector((state: RootState) => state);
    return {
        pagination: state.pagination,
        state: state,
        ticketId: state.id,
        loading: isLoadingState(state),
        error: isErrorState(state) ? state.error : undefined,
    };
} 