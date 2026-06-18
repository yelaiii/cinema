import { useUrlSearchParams } from '@siberiacancode/reactuse'

import type { BuyTicketSearchParams } from '@/app/buy/_types'

import { BuyTicketsStep } from '@/app/buy/_types'

const reviewTicketsDefaultValue: BuyTicketSearchParams = {
  filmName: '',
  seats: [],
  date: '',
  time: '',
  hallName: '',
  fullPrice: 0,
}

export function useReviewTickets() {
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: reviewTicketsDefaultValue,
  })

  const { filmName, seats, date, time, hallName, fullPrice } = urlSearchParams.value

  const handleBack = () => {
    urlSearchParams.set({ step: BuyTicketsStep.PickSeats })
  }

  const handleNext = () => {
    urlSearchParams.set({ step: BuyTicketsStep.Contacts })
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
