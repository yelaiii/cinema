import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { BUY_URL_PARAMS } from '@/app/buy/_constants'

export function usePayed() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filmName = searchParams.get(BUY_URL_PARAMS.FILM_NAME)
  const seats = JSON.parse(searchParams.get(BUY_URL_PARAMS.SEATS)!) as {
    row: number
    column: number
  }[]
  const date = searchParams.get(BUY_URL_PARAMS.DATE)
  const time = searchParams.get(BUY_URL_PARAMS.TIME)
  const hallName = searchParams.get(BUY_URL_PARAMS.HALL_NAME)
  const ticketIds = JSON.parse(searchParams.get(BUY_URL_PARAMS.TICKETS)!) as string[]

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
