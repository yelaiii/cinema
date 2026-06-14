'use client'

import type { JSX } from 'react'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { Contacts } from './_components/contacts'
import { Pay } from './_components/pay'
import { Payed } from './_components/payed'
import { PickSeats } from './_components/pick-seats'
import { ReviewTickets } from './_components/review-tickets'
import { BuyTicketsStep } from './_types'

const STEPS: Record<BuyTicketsStep, () => JSX.Element> = {
  'pick-seats': PickSeats,
  'review-tickets': ReviewTickets,
  contacts: Contacts,
  pay: Pay,
  payed: Payed,
}

export default function BuyTicketPage() {
  const [step] = useQueryState(
    'step',
    parseAsStringLiteral(Object.values(BuyTicketsStep)).withDefault(BuyTicketsStep['Pick-seats']),
  )

  const Component = STEPS[step]

  return <Component />
}
