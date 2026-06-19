import { useQuery } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
import { parseAsFloat, parseAsJson, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { getCinemaFilmByFilmIdSchedule } from '@/api'
import { BUY_URL_PARAMS, BuyTicketsStep } from '@/app/buy/_constants'

export function usePickSeats() {
  const router = useRouter()

  const [query, setQuery] = useQueryStates({
    [BUY_URL_PARAMS.SEATS]: parseAsJson((v) => v as { row: number; column: number }[]),
    [BUY_URL_PARAMS.FILM_ID]: parseAsString,
    [BUY_URL_PARAMS.DATE]: parseAsString,
    [BUY_URL_PARAMS.TIME]: parseAsString,
    [BUY_URL_PARAMS.HALL_NAME]: parseAsString,
    [BUY_URL_PARAMS.FULL_PRICE]: parseAsFloat,
    [BUY_URL_PARAMS.STEP]: parseAsStringEnum<BuyTicketsStep>(Object.values(BuyTicketsStep)),
  })

  const selectedSeats = query[BUY_URL_PARAMS.SEATS] ?? []
  const filmId = query[BUY_URL_PARAMS.FILM_ID]
  const date = query[BUY_URL_PARAMS.DATE]
  const time = query[BUY_URL_PARAMS.TIME]
  const hallName = query[BUY_URL_PARAMS.HALL_NAME]
  const fullPrice = query[BUY_URL_PARAMS.FULL_PRICE] ?? 0

  const scheduleQuery = useQuery(() => getCinemaFilmByFilmIdSchedule({ path: { filmId: filmId! } }))

  const seats = useMemo(() => {
    if (!scheduleQuery.data) return undefined
    const schedule = scheduleQuery.data.data.schedules.find((s) => s.date === date)
    const seance = schedule?.seances.find((s) => s.time === time && s.hall.name === hallName)
    return seance?.hall.places
  }, [scheduleQuery.data, date, time, hallName])

  const handleSeatClick = async (row: number, column: number) => {
    if (!seats) return
    const seat = seats[row]?.[column]
    if (!seat || seat.type === 'BLOCKED') return

    const isSelected = selectedSeats.some((s) => s.row === row && s.column === column)
    if (isSelected) {
      await setQuery({
        [BUY_URL_PARAMS.SEATS]: selectedSeats.filter(
          (s) => !(s.row === row && s.column === column),
        ),
        [BUY_URL_PARAMS.FULL_PRICE]: fullPrice - seat.price,
      })
    } else {
      await setQuery({
        [BUY_URL_PARAMS.SEATS]: [...selectedSeats, { row, column }],
        [BUY_URL_PARAMS.FULL_PRICE]: fullPrice + seat.price,
      })
    }
  }

  const handleNext = async () => {
    await setQuery({ [BUY_URL_PARAMS.STEP]: BuyTicketsStep.ReviewTickets })
  }

  const handleBack = () => {
    router.push(`/film/${filmId}`)
  }

  return {
    state: {
      seats,
      selectedSeats,
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
