import { useI18n } from '@kanjou/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { BuyFlowUrlParams } from '@/app/buy/_constants'

export function usePayed() {
  const { t, locale } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()

  const filmName = searchParams.get(BuyFlowUrlParams.FILM_NAME)
  const seats = JSON.parse(searchParams.get(BuyFlowUrlParams.SELECTED_SEATS)!) as {
    row: number
    column: number
  }[]
  const date = searchParams.get(BuyFlowUrlParams.DATE)
  const time = searchParams.get(BuyFlowUrlParams.TIME)
  const hallName = searchParams.get(BuyFlowUrlParams.HALL_NAME)
  const ticketIds = JSON.parse(searchParams.get(BuyFlowUrlParams.TICKETS)!) as string[]

  const formattedSeats = (() => {
    if (!seats?.length) return ''

    const formatter = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' })

    const grouped = seats.reduce<Record<number, number[]>>((acc, { row, column }) => {
      ;(acc[row] ??= []).push(column)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([row, cols]) => {
        cols.sort((a, b) => a - b)
        return t('common.row-seats-list-format', {
          row,
          seats: formatter.format(cols.map(String)),
          count: cols.length,
        })
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
