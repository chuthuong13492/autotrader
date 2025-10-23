// features/ticket/ticketApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Ticket } from "../models/ticket";
import type { Pagination } from "@/components/layout/data/pagination";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    getTicket: builder.query<Ticket, number>({
      query: (id) => `/api/tickets/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Ticket", id }],
    }),

    getTickets: builder.query<Pagination<Ticket>, {
      page: number;
      limit?: number;
      search?: string;
      typeId?: number;
      stateId?: number;
      stateGroupId?: number;
      stationId?: number;
      minCreateDate?: Date;
      maxCreateDate?: Date;
      handlerCode?: string;
    }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        searchParams.set("page", params.page.toString());
        if (params.limit) searchParams.set("limit", params.limit.toString());
        if (params.search) searchParams.set("search", params.search);
        if (params.typeId) searchParams.set("typeId", params.typeId.toString());
        if (params.stateId) searchParams.set("stateId", params.stateId.toString());
        if (params.stateGroupId) searchParams.set("stateGroupId", params.stateGroupId.toString());
        if (params.stationId) searchParams.set("stationId", params.stationId.toString());
        if (params.minCreateDate) searchParams.set("minCreateDate", params.minCreateDate.toISOString());
        if (params.maxCreateDate) searchParams.set("maxCreateDate", params.maxCreateDate.toISOString());
        if (params.handlerCode) searchParams.set("handlerCode", params.handlerCode);

        return `/api/tickets?${searchParams}`;
      },
      transformResponse: (res: Pagination<Ticket>) => res,
      providesTags: (result) =>
        result
          ? result.list.map((ticket) => ({ type: "Ticket" as const, id: ticket.id }))
          : [],
    }),

    refreshTicket: builder.mutation<void, number>({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: (_result, _error, id) => [{ type: "Ticket", id }],
    }),
  }),
});

export const {
  useGetTicketQuery,
  useLazyGetTicketQuery,
  useGetTicketsQuery,
  useRefreshTicketMutation,
} = ticketApi;