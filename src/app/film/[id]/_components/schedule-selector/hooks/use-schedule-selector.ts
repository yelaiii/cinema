import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft'
import type { MouseEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'

import type { FilmResponse, ScheduleResponse } from '@/api'

import { BuyTicketsStep } from '@/app/buy/_types'

export function useScheduleSelector(
  film: ApicraftFetchesResponse<FilmResponse>,
  filmSchedule: ApicraftFetchesResponse<ScheduleResponse>,
) {
  const router = useRouter()

  const { id } = useParams<{ id: string }>()
  const [date, setDate] = useQueryState('date', {
    defaultValue: filmSchedule.data.schedules[0].date,
  })
  const [time, setTime] = useQueryState('time')
  const [hallName, setHallName] = useQueryState('hallName')

  const handleDateChange = async (value: string) => {
    await setDate(value)
    await setHallName(null)
    await setTime(null)
  }

  const handleTimeChange = async (hallName: string, time: string) => {
    await setHallName(hallName)
    await setTime(time)
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
      step: BuyTicketsStep['Pick-seats'],
      filmName: film.data.film.name,
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
