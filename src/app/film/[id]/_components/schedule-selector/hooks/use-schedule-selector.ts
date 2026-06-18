import type { MouseEvent } from 'react'

import { useUrlSearchParams } from '@siberiacancode/reactuse'
import { useParams, useRouter } from 'next/navigation'

import type { FilmResponse } from '@/api'

import { BuyTicketsStep } from '@/app/buy/_types'

export function useScheduleSelector({
  film,
  defaultTime,
}: {
  film: FilmResponse['film']
  defaultTime: string
}) {
  const router = useRouter()

  const { id } = useParams<{ id: string }>()

  const urlSearchParams = useUrlSearchParams({
    initialValue: {
      date: defaultTime,
      time: '',
      hallName: '',
    },
  })

  const { date, time, hallName } = urlSearchParams.value

  const handleDateChange = (value: string) => {
    urlSearchParams.set({
      date: value,
      hallName: undefined,
      time: undefined,
    })
  }

  const handleTimeChange = (hallName: string, time: string) => {
    urlSearchParams.set({
      hallName,
      time,
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
      date,
      time,
      hallName,
      filmId: id,
      step: BuyTicketsStep.PickSeats,
      filmName: film.name,
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
