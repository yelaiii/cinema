export const BUY_URL_PARAMS = {
  STEP: 'step',
  FILM_ID: 'id',
  FILM_NAME: 'film',
  DATE: 'date',
  TIME: 'time',
  HALL_NAME: 'hall',
  SEATS: 'seats',
  FULL_PRICE: 'price',
  LAST_NAME: 'lastName',
  FIRST_NAME: 'firstName',
  MIDDLE_NAME: 'middleName',
  CITY: 'city',
  PHONE: 'phone',
  EMAIL: 'email',
  TICKETS: 'tickets',
} as const

export const BuyTicketsStep = {
  PickSeats: 'pick-seats',
  ReviewTickets: 'review-tickets',
  Contacts: 'contacts',
  Pay: 'pay',
  Payed: 'payed',
} as const
export type BuyTicketsStep = (typeof BuyTicketsStep)[keyof typeof BuyTicketsStep]
