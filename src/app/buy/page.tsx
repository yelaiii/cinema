'use client'

import type { JSX } from 'react'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { Suspense } from 'react'

import { Loader } from '@/components/ui/loader'

import { Contacts } from './_components/contacts'
import { Pay } from './_components/pay'
import { Payed } from './_components/payed'
import { PickSeats } from './_components/pick-seats'
import { ReviewTickets } from './_components/review-tickets'
import { BuyFlowUrlParams, BuyFlowStep } from './_constants'

const STEPS: Record<BuyFlowStep, () => JSX.Element> = {
  'pick-seats': PickSeats,
  'review-tickets': ReviewTickets,
  contacts: Contacts,
  pay: Pay,
  payed: Payed,
}

function BuyTicketPageContent() {
  const [step] = useQueryState(
    BuyFlowUrlParams.STEP,
    parseAsStringEnum<BuyFlowStep>(Object.values(BuyFlowStep)).withDefault(BuyFlowStep.PICK_SEATS),
  )

  const Component = STEPS[step]

  return <Component />
}

export default function BuyTicketPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-[48px]">
          <Loader />
        </div>
      }
    >
      <BuyTicketPageContent />
    </Suspense>
  )
}
