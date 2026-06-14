import { parseAsJson, parseAsStringLiteral, useQueryState } from 'nuqs'

import { BuyTicketsStep } from '@/app/buy/_types'

import type { HallSeat } from '../../pick-seats'

export function useReviewTickets() {
  const [_step, setStep] = useQueryState(
    'step',
    parseAsStringLiteral(Object.values(BuyTicketsStep)).withDefault(BuyTicketsStep['Pick-seats']),
  )
  const [filmName] = useQueryState('filmName')
  const [seats] = useQueryState(
    'seats',
    parseAsJson((val) => val as HallSeat[]),
  )
  const [date] = useQueryState('date')
  const [time] = useQueryState('time')
  const [hallName] = useQueryState('hallName')
  const [fullPrice] = useQueryState('fullPrice')

  const handleBack = async () => {
    await setStep(BuyTicketsStep['Pick-seats'])
  }

  const handleNext = async () => {
    await setStep(BuyTicketsStep.Contacts)
  }

  return {
    state: {
      filmName,
      seats,
      date,
      time,
      hallName,
      fullPrice,
    },
    functions: {
      handleBack,
      handleNext,
    },
  }
}
