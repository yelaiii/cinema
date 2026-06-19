import type { MouseEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'

import type { FilmResponse } from '@/api'

import { BUY_URL_PARAMS, BuyTicketsStep } from '@/app/buy/_constants'

export function useScheduleSelector({
  film,
  defaultDate,
}: {
  film: FilmResponse['film']
  defaultDate: string
}) {
  const router = useRouter()

  const { id } = useParams<{ id: string }>()

  const [query, setQuery] = useQueryStates({
    [BUY_URL_PARAMS.DATE]: parseAsString,
    [BUY_URL_PARAMS.TIME]: parseAsString,
    [BUY_URL_PARAMS.HALL_NAME]: parseAsString,
  })

  const date = query[BUY_URL_PARAMS.DATE] || defaultDate
  const time = query[BUY_URL_PARAMS.TIME] || ''
  const hallName = query[BUY_URL_PARAMS.HALL_NAME] || ''

  const handleDateChange = async (value: string) => {
    await setQuery({
      [BUY_URL_PARAMS.DATE]: value,
      [BUY_URL_PARAMS.HALL_NAME]: null,
      [BUY_URL_PARAMS.TIME]: null,
    })
  }

  const handleTimeChange = async (hallName: string, time: string) => {
    await setQuery({
      [BUY_URL_PARAMS.HALL_NAME]: hallName,
      [BUY_URL_PARAMS.TIME]: time,
    })
  }

  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const handleSubmit = () => {
    if (!date || !time || !hallName) return

    const searchParams = new URLSearchParams({
      [BUY_URL_PARAMS.DATE]: date,
      [BUY_URL_PARAMS.TIME]: time,
      [BUY_URL_PARAMS.HALL_NAME]: hallName,
      [BUY_URL_PARAMS.FILM_ID]: id,
      [BUY_URL_PARAMS.STEP]: BuyTicketsStep.PickSeats,
      [BUY_URL_PARAMS.FILM_NAME]: film.name,
    }).toString()
    router.push(`/buy/?${searchParams}`)
  }

  return {
    state: {
      date,
      time,
      hallName,
    },
    functions: {
      handleTabClick,
      handleDateChange,
      handleTimeChange,
      handleSubmit,
    },
  }
}
