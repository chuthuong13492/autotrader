import { useDispatch } from "react-redux";
import {
  getItemAsync,
  getTicketsAsync,
  refresh,
  clear,
  unmount,
  subscribeItem,
  subscribeRefresh,
  subscribeClear,
} from "@/stores/ticket/ticket-slice";
import { type TicketDispatch } from "@/stores/ticket/ticket-store";
import { useCallback } from "react";

export const useTicketRepository = () => {
  const dispatch = useDispatch<TicketDispatch>();

  const getItem = useCallback(
    (id: number) => dispatch(getItemAsync(id)),
    [dispatch]
  );
  const getTickets = useCallback(
    (page: number, limit?: number) =>
      dispatch(getTicketsAsync({ page, limit })),
    [dispatch]
  );
  const doRefresh = useCallback(
    (id?: number) => {
      dispatch(refresh(id));
      if (id) dispatch(getItemAsync(id));
    },
    [dispatch]
  );
  const doClear = useCallback(() => dispatch(clear()), [dispatch]);
  const doUnmount = useCallback(() => dispatch(unmount()), [dispatch]);

  return {
    getItem,
    getTickets,
    refresh: doRefresh,
    clear: doClear,
    unmọunt: doUnmount,
    subscribeItem,
    subscribeRefresh,
    subscribeClear,
  };
};
