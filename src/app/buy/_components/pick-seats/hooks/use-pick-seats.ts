import { useQuery } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
import { parseAsJson, parseAsStringLiteral, parseAsInteger, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { getCinemaFilmByFilmIdSchedule } from '@/api'
import { BuyTicketsStep } from '@/app/buy/_types'

import type { HallSeat } from '../pick-seats'

export function usePickSeats() {
  const router = useRouter()

  const [_step, setStep] = useQueryState(
    'step',
    parseAsStringLiteral(Object.values(BuyTicketsStep)).withDefault(BuyTicketsStep['Pick-seats']),
  )
  const [selectedSeats, setSelectedSeats] = useQueryState(
    'seats',
    parseAsJson((val) => val as HallSeat[]).withDefault([]),
  )

  const [filmId] = useQueryState('filmId')
  const [date] = useQueryState('date')
  const [time] = useQueryState('time')
  const [hallName] = useQueryState('hallName')
  const [_fullPrice, setFullPrice] = useQueryState('fullPrice', parseAsInteger.withDefault(0))

  const scheduleQuery = useQuery(
    () => getCinemaFilmByFilmIdSchedule({ path: { filmId: filmId! } }),
    {
      keys: [filmId],
      enabled: !!filmId,
    },
  )

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
      await setSelectedSeats(selectedSeats.filter((s) => !(s.row === row && s.column === column)))
      await setFullPrice((prev) => Math.max(0, prev - seat.price))
    } else {
      await setSelectedSeats([...selectedSeats, { row, column }])
      await setFullPrice((prev) => prev + seat.price)
    }
  }

  const handleNext = async () => {
    await setStep(BuyTicketsStep['Review-tickets'])
  }

  const handleBack = () => {
    router.back()
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
