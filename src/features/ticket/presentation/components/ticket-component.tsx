import { useGetTicketQuery } from "../../data/apis/ticket-api";
import type { Ticket } from "../../data/models/ticket";

interface TicketComponentProps {
  id: number;
  initialItem?: Ticket;
  builder: (item: Ticket) => React.ReactNode;
  emptyBuilder?: () => React.ReactNode;
}

export const TicketComponent: React.FC<TicketComponentProps> = ({
  id,
  initialItem,
  builder,
  emptyBuilder,
}) => {
  const { data: ticket } = useGetTicketQuery(id, {
    skip: !id,
    selectFromResult: ({ data }) => ({
      data: data ?? initialItem,
    }),
  });

  if (ticket) return <>{builder(ticket)}</>;

  return <>{emptyBuilder?.() ?? null}</>;
};