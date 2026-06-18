import { useUrlSearchParams } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'

import type { BuyTicketSearchParams } from '@/app/buy/_types'

const payedDefaultValue: BuyTicketSearchParams = {
  filmName: '',
  seats: [],
  date: '',
  time: '',
  hallName: '',
  ticketIds: [],
}

export function usePayed() {
  const router = useRouter()
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: payedDefaultValue,
  })

  const { filmName, seats, date, time, hallName, ticketIds } = urlSearchParams.value

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

  const formattedTicketIds = ticketIds ? ticketIds.map((id) => id.slice(0, 5)).join(', ') : ''

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
