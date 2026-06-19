import type { MouseEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'

import type { FilmResponse } from '@/api'

import { BuyFlowUrlParams, BuyFlowStep } from '@/app/buy/_constants'

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
    [BuyFlowUrlParams.DATE]: parseAsString.withDefault(defaultDate),
    [BuyFlowUrlParams.TIME]: parseAsString,
    [BuyFlowUrlParams.HALL_NAME]: parseAsString,
  })

  const handleDateChange = async (value: string) => {
    await setQuery({
      [BuyFlowUrlParams.DATE]: value,
      [BuyFlowUrlParams.HALL_NAME]: null,
      [BuyFlowUrlParams.TIME]: null,
    })
  }

  const handleTimeChange = async (hallName: string, time: string) => {
    await setQuery({
      [BuyFlowUrlParams.HALL_NAME]: hallName,
      [BuyFlowUrlParams.TIME]: time,
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
    if (
      !query[BuyFlowUrlParams.DATE] ||
      !query[BuyFlowUrlParams.TIME] ||
      !query[BuyFlowUrlParams.HALL_NAME]
    )
      return

    const searchParams = new URLSearchParams({
      [BuyFlowUrlParams.DATE]: query[BuyFlowUrlParams.DATE],
      [BuyFlowUrlParams.TIME]: query[BuyFlowUrlParams.TIME]!,
      [BuyFlowUrlParams.HALL_NAME]: query[BuyFlowUrlParams.HALL_NAME]!,
      [BuyFlowUrlParams.FILM_ID]: id,
      [BuyFlowUrlParams.STEP]: BuyFlowStep.PICK_SEATS,
      [BuyFlowUrlParams.FILM_NAME]: film.name,
    })
    router.push(`/buy/?${searchParams.toString()}`)
  }

  return {
    state: {
      date: query[BuyFlowUrlParams.DATE],
      time: query[BuyFlowUrlParams.TIME],
      hallName: query[BuyFlowUrlParams.HALL_NAME],
    },
    functions: {
      handleTabClick,
      handleDateChange,
      handleTimeChange,
      handleSubmit,
    },
  }
}
