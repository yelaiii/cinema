import { useRouter } from 'next/navigation'
import { parseAsJson, useQueryState } from 'nuqs'

import type { HallSeat } from '../../pick-seats'

export function usePayed() {
  const router = useRouter()

  const [filmName] = useQueryState('filmName')
  const [seats] = useQueryState(
    'seats',
    parseAsJson((val) => val as HallSeat[]),
  )
  const [date] = useQueryState('date')
  const [time] = useQueryState('time')
  const [hallName] = useQueryState('hallName')
  const [ticketIds] = useQueryState(
    'ticketIds',
    parseAsJson((val) => val as string[]),
  )

  const formattedSeats = (() => {
    if (!seats?.length) return ''

    const formatter = new Intl.ListFormat('ru', { style: 'long', type: 'conjunction' })

    const grouped = seats.reduce<Record<number, number[]>>((acc, { row, column }) => {
      ;(acc[row] ??= []).push(column)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([row, cols]) => {
        cols.sort((a, b) => a - b)
        const colStr = formatter.format(cols.map(String))
        const word = cols.length === 1 ? 'место' : 'места'

        return `${row} ряд, ${colStr} ${word}`
      })
      .join('; ')
  })()

  const formattedTicketIds = ticketIds!.map((id) => id.slice(0, 5)).join(', ')

  const handleGoToDetails = () => {
    router.push('/tickets')
  }

  const handleGoToHome = () => {
    router.push('/')
  }

  return {
    state: {
      filmName,
      seats,
      date,
      time,
      hallName,
      ticketIds,
      formattedSeats,
      formattedTicketIds,
    },
    functions: {
      handleGoToDetails,
      handleGoToHome,
    },
  }
}
