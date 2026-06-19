import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BuyFlowUrlParams, BuyFlowStep } from '@/app/buy/_constants'

export function useReviewTickets() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filmName = searchParams.get(BuyFlowUrlParams.FILM_NAME)
  const seats = JSON.parse(searchParams.get(BuyFlowUrlParams.SELECTED_SEATS)!) as {
    row: number
    column: number
  }[]
  const date = searchParams.get(BuyFlowUrlParams.DATE)
  const time = searchParams.get(BuyFlowUrlParams.TIME)
  const hallName = searchParams.get(BuyFlowUrlParams.HALL_NAME)
  const fullPrice = +searchParams.get(BuyFlowUrlParams.FULL_PRICE)!

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BuyFlowUrlParams.STEP, BuyFlowStep.PICK_SEATS)
    router.push(`?${params.toString()}`)
  }

  const handleNext = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BuyFlowUrlParams.STEP, BuyFlowStep.CONTACTS)
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
