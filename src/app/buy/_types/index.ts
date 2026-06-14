export const BuyTicketsStep = {
  'Pick-seats': 'pick-seats',
  'Review-tickets': 'review-tickets',
  Contacts: 'contacts',
  Pay: 'pay',
  Payed: 'payed',
} as const
export type BuyTicketsStep = (typeof BuyTicketsStep)[keyof typeof BuyTicketsStep]
