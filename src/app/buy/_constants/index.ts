export const BuyFlowUrlParams = {
  STEP: 'step',
  FILM_ID: 'id',
  FILM_NAME: 'film',
  DATE: 'date',
  TIME: 'time',
  HALL_NAME: 'hall',
  SELECTED_SEATS: 'seats',
  FULL_PRICE: 'price',
  LAST_NAME: 'lastName',
  FIRST_NAME: 'firstName',
  MIDDLE_NAME: 'middleName',
  CITY: 'city',
  PHONE: 'phone',
  EMAIL: 'email',
  TICKETS: 'tickets',
} as const

export const BuyFlowStep = {
  PICK_SEATS: 'pick-seats',
  REVIEW_TICKETS: 'review-tickets',
  CONTACTS: 'contacts',
  PAY: 'pay',
  SUCCESS: 'payed',
} as const
export type BuyFlowStep = (typeof BuyFlowStep)[keyof typeof BuyFlowStep]
