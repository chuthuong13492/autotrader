import type { Pagination } from "@/components/layout/data/pagination";
import type { Ticket } from "@/features/ticket/data/ticket";

export async function fetchTicketApi(
    id: number,
    signal?: AbortSignal
  ): Promise<Ticket> {
    const res = await fetch(`/api/tickets/${id}`, { signal });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  }
  
 export async function fetchTicketsApi(params: {
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
  }): Promise<Pagination<Ticket>> {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.search) searchParams.set("search", params.search);
    if (params.typeId) searchParams.set("typeId", params.typeId.toString());
    if (params.stateId) searchParams.set("stateId", params.stateId.toString());
    if (params.stateGroupId)
      searchParams.set("stateGroupId", params.stateGroupId.toString());
    if (params.stationId)
      searchParams.set("stationId", params.stationId.toString());
    if (params.minCreateDate)
      searchParams.set("minCreateDate", params.minCreateDate.toISOString());
    if (params.maxCreateDate)
      searchParams.set("maxCreateDate", params.maxCreateDate.toISOString());
    if (params.handlerCode) searchParams.set("handlerCode", params.handlerCode);
  
    const res = await fetch(`/api/tickets?${searchParams}`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  }
  