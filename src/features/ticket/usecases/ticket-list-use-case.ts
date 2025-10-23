import type { Pagination } from "@/components/layout/data/pagination";
import { type Either, Right } from "@/components/layout/data/either";
import type { FailureType } from "@/components/layout/data/failure";
import { execute } from "@/lib/execute";
import type { Ticket } from "@/features/ticket/models/ticket";

export const TicketListUseCase = {
  loadTickets: async (): Promise<Either<FailureType, Pagination<Ticket>>> => {
    return execute(
      async () => {
        // Giả lập API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockTickets: Ticket[] = [
          { id: 1, title: "Ticket 1", state: "open" },
          { id: 2, title: "Ticket 2", state: "closed" },
          { id: 3, title: "Ticket 3", state: "pending" },
        ];

        return Right({
          list: mockTickets,
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: mockTickets.length,
        });
      },
      {
        funcTitle: "loadTickets",
        errorMessage: "Failed to load tickets",
      }
    );
  },
};