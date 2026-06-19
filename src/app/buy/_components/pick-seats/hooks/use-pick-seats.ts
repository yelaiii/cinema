import { useQuery } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
import { parseAsFloat, parseAsJson, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { getCinemaFilmByFilmIdSchedule } from '@/api'
import { BuyFlowUrlParams, BuyFlowStep } from '@/app/buy/_constants'

export function usePickSeats() {
  const router = useRouter()

  const [query, setQuery] = useQueryStates({
    [BuyFlowUrlParams.SELECTED_SEATS]: parseAsJson(
      (v) => v as { row: number; column: number }[],
    ).withDefault([]),
    [BuyFlowUrlParams.FILM_ID]: parseAsString,
    [BuyFlowUrlParams.DATE]: parseAsString,
    [BuyFlowUrlParams.TIME]: parseAsString,
    [BuyFlowUrlParams.HALL_NAME]: parseAsString,
    [BuyFlowUrlParams.FULL_PRICE]: parseAsFloat.withDefault(0),
    [BuyFlowUrlParams.STEP]: parseAsStringEnum<BuyFlowStep>(Object.values(BuyFlowStep)),
  })

  const scheduleQuery = useQuery(() =>
    getCinemaFilmByFilmIdSchedule({ path: { filmId: query[BuyFlowUrlParams.FILM_ID]! } }),
  )

  const seats = useMemo(() => {
    if (!scheduleQuery.data) return undefined
    const schedule = scheduleQuery.data.data.schedules.find(
      (s) => s.date === query[BuyFlowUrlParams.DATE],
    )
    const seance = schedule?.seances.find(
      (s) =>
        s.time === query[BuyFlowUrlParams.TIME] &&
        s.hall.name === query[BuyFlowUrlParams.HALL_NAME],
    )
    return seance?.hall.places
  }, [
    scheduleQuery.data,
    query[BuyFlowUrlParams.DATE],
    query[BuyFlowUrlParams.TIME],
    query[BuyFlowUrlParams.HALL_NAME],
  ])

  const handleSeatClick = async (row: number, column: number) => {
    if (!seats) return
    const seat = seats[row]?.[column]
    if (!seat || seat.type === 'BLOCKED') return

    const isSelected = query[BuyFlowUrlParams.SELECTED_SEATS].some(
      (s) => s.row === row && s.column === column,
    )
    if (isSelected) {
      await setQuery({
        [BuyFlowUrlParams.SELECTED_SEATS]: query[BuyFlowUrlParams.SELECTED_SEATS].filter(
          (s) => !(s.row === row && s.column === column),
        ),
        [BuyFlowUrlParams.FULL_PRICE]: query[BuyFlowUrlParams.FULL_PRICE] - seat.price,
      })
    } else {
      await setQuery({
        [BuyFlowUrlParams.SELECTED_SEATS]: [
          ...query[BuyFlowUrlParams.SELECTED_SEATS],
          { row, column },
        ],
        [BuyFlowUrlParams.FULL_PRICE]: query[BuyFlowUrlParams.FULL_PRICE] + seat.price,
      })
    }
  }

  const handleNext = async () => {
    await setQuery({ [BuyFlowUrlParams.STEP]: BuyFlowStep.REVIEW_TICKETS })
  }

  const handleBack = () => {
    router.push(`/film/${query[BuyFlowUrlParams.FILM_ID]}`)
  }

  return {
    state: {
      seats,
      selectedSeats: query[BuyFlowUrlParams.SELECTED_SEATS],
    },
    queries: {
      schedule: scheduleQuery,
    },
    functions: {
      handleSeatClick,
      handleNext,
      handleBack,
    },
  }
}
