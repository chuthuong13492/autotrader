import React, { useEffect, useState } from 'react'
import { selectItem } from '@/stores/ticket/ticket-slice'
import type { Ticket } from "@/features/ticket/data/ticket";
import { useSelector } from 'react-redux';
import { useTicketRepository } from '@/features/ticket/hooks/use-ticket-repository';

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
  const repository = useTicketRepository();
  const ticket = useSelector(selectItem(id));

  const [item, setItem] = useState<Ticket | undefined>(initialItem || ticket);

  useEffect(() => {
    if (!item) {
      repository.getItem(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const unsubscribe = repository.subscribeItem(id, (ticket) => {
      setItem(ticket);
    });
    return unsubscribe;
  }, [id, repository]);

  if (item) return <>{builder(item)}</>;

  return <>{emptyBuilder?.() ?? null}</>;
};