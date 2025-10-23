import { useGetTicketQuery } from "../../../../../stores/ticket/ticket-api";
import type { Ticket } from "../../../models/ticket";

interface TicketSubscriberProps {
  id: number;
  initialItem?: Ticket;
  builder: (item: Ticket) => React.ReactNode;
  emptyBuilder?: () => React.ReactNode;
}

export const TicketSubscriber: React.FC<TicketSubscriberProps> = ({
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