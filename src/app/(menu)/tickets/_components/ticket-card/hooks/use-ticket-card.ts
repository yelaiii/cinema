import { useDisclosure } from '@siberiacancode/reactuse'

import type { CinemaTicket } from '@/api'

import { parseDDMMYY } from '@/app/_utils/parse-date-string'

import { returnTicketAction } from '../actions/return-ticket'

interface TicketCardProps {
  ticket: CinemaTicket
}

export function useTicketCard({ ticket }: TicketCardProps) {
  const date = parseDDMMYY(ticket.seance.date)

  const drawer = useDisclosure()

  const handleReturnTicket = async () => {
    drawer.close()
    await returnTicketAction(ticket.orderId)
  }

  return {
    state: { date },
    functions: { handleReturnTicket },
    features: { drawer },
  }
}
