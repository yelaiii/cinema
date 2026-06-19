import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BUY_URL_PARAMS, BuyTicketsStep } from '@/app/buy/_constants'

export function useReviewTickets() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filmName = searchParams.get(BUY_URL_PARAMS.FILM_NAME)
  const seats = JSON.parse(searchParams.get(BUY_URL_PARAMS.SEATS)!) as {
    row: number
    column: number
  }[]
  const date = searchParams.get(BUY_URL_PARAMS.DATE)
  const time = searchParams.get(BUY_URL_PARAMS.TIME)
  const hallName = searchParams.get(BUY_URL_PARAMS.HALL_NAME)
  const fullPrice = +searchParams.get(BUY_URL_PARAMS.FULL_PRICE)!

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BUY_URL_PARAMS.STEP, BuyTicketsStep.PickSeats)
    router.push(`?${params.toString()}`)
  }

  const handleNext = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BUY_URL_PARAMS.STEP, BuyTicketsStep.Contacts)
    router.push(`?${params.toString()}`)
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
