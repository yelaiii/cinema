export const BuyTicketsStep = {
  PickSeats: 'pick-seats',
  ReviewTickets: 'review-tickets',
  Contacts: 'contacts',
  Pay: 'pay',
  Payed: 'payed',
} as const
export type BuyTicketsStep = (typeof BuyTicketsStep)[keyof typeof BuyTicketsStep]

export interface BuyTicketSearchParams {
  step?: BuyTicketsStep
  filmId?: string
  filmName?: string
  date?: string
  time?: string
  hallName?: string
  seats?: { row: number; column: number }[]
  fullPrice?: number
  lastName?: string
  firstName?: string
  middleName?: string
  city?: string
  phone?: string
  email?: string
  ticketIds?: string[]
}
