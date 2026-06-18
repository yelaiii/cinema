'use client'

import type { JSX } from 'react'

import { useUrlSearchParams } from '@siberiacancode/reactuse'

import type { BuyTicketSearchParams } from './_types'

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

const buyPageDefaultValue: BuyTicketSearchParams = {
  step: BuyTicketsStep.PickSeats,
}

export default function BuyTicketPage() {
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: buyPageDefaultValue,
  })

  const step = urlSearchParams.value.step!

  const Component = STEPS[step]

  return <Component />
}
