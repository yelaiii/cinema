import { useQuery, useUrlSearchParams } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import type { BuyTicketSearchParams } from '@/app/buy/_types'

import { getCinemaFilmByFilmIdSchedule } from '@/api'
import { BuyTicketsStep } from '@/app/buy/_types'

const pickSeatsDefaultValue: BuyTicketSearchParams = {
  seats: [],
  filmId: '',
  date: '',
  time: '',
  hallName: '',
  fullPrice: 0,
}

export function usePickSeats() {
  const router = useRouter()
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: pickSeatsDefaultValue,
  })

  const {
    seats: selectedSeats = [],
    filmId,
    date,
    time,
    hallName,
    fullPrice = 0,
  } = urlSearchParams.value

  const scheduleQuery = useQuery(() => getCinemaFilmByFilmIdSchedule({ path: { filmId: filmId! } }))

  const seats = useMemo(() => {
    if (!scheduleQuery.data) return undefined
    const schedule = scheduleQuery.data.data.schedules.find((s) => s.date === date)
    const seance = schedule?.seances.find((s) => s.time === time && s.hall.name === hallName)
    return seance?.hall.places
  }, [scheduleQuery.data, date, time, hallName])

  const handleSeatClick = (row: number, column: number) => {
    if (!seats) return
    const seat = seats[row]?.[column]
    if (!seat || seat.type === 'BLOCKED') return

    const isSelected = selectedSeats.some((s) => s.row === row && s.column === column)
    if (isSelected) {
      urlSearchParams.set({
        seats: selectedSeats.filter((s) => !(s.row === row && s.column === column)),
        fullPrice: Math.max(0, fullPrice - seat.price),
      })
    } else {
      urlSearchParams.set({
        seats: [...selectedSeats, { row, column }],
        fullPrice: fullPrice + seat.price,
      })
    }
  }

  const handleNext = () => {
    urlSearchParams.set({ step: BuyTicketsStep.ReviewTickets })
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
