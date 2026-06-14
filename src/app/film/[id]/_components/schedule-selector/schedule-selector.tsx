'use client'

import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft'

import { XIcon } from 'lucide-react'

import type { FilmResponse, ScheduleResponse } from '@/api'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { parseDateString } from '@/utils/parse-date-string'

import type { TimeByHall } from '../../_utils/group-time-by-hall'

import { useScheduleSelector } from './hooks/use-schedule-selector'

export function ScheduleSelector({
  film,
  filmSchedule,
  timeByHall,
}: {
  film: ApicraftFetchesResponse<FilmResponse>
  filmSchedule: ApicraftFetchesResponse<ScheduleResponse>
  timeByHall: TimeByHall
}) {
  const { state, functions } = useScheduleSelector(film, filmSchedule)

  return (
    <div className="mt-[24px] flex flex-col gap-[24px]">
      <Tabs
        defaultValue={filmSchedule.data.schedules[0].date}
        value={state.date}
        onValueChange={functions.handleDateChange}
      >
        <TabsList className="overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar -mr-[16px] pr-[20px] md:mr-0 md:pr-[4px] rounded-r-none md:rounded-r-infinite">
          {filmSchedule.data.schedules.map((schedule) => {
            const date = parseDateString(schedule.date)

            return (
              <TabsTrigger
                key={schedule.date}
                value={schedule.date}
                onClick={functions.handleTabClick}
              >
                {date.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  weekday: 'short',
                })}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {Object.entries(timeByHall[state.date]).map(([hall, times]) => (
        <div className="flex flex-col gap-[8px]" key={hall}>
          <Typography tag="div" variant="caption" className="text-surface">
            {hall}
          </Typography>
          <div className="flex gap-[8px] flex-wrap">
            {times.map((time) => (
              <button
                key={`${hall}-${time}`}
                data-active={state.time === time && state.hallName === hall}
                onClick={() => functions.handleTimeChange(hall, time)}
                className="px-[32px] data-[active=true]:px-[18px] text-primary font-bold text-[20px] leading-[28px] tracking-[1.5%] bg-secondary hover:enabled:bg-secondary-hover data-[active=true]:hover:bg-pink-500 disabled:opacity-30 py-[12px] rounded-infinite data-[active=true]:bg-pink-600 data-[active=true]:text-primary-foreground cursor-pointer flex gap-[8px] items-center justify-center"
              >
                {time}
                {state.time === time && state.hallName === hall && (
                  <XIcon className="size-[20px]" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="pb-[40px]">
        <Button
          onClick={functions.handleSubmit}
          disabled={!state.time || !state.hallName}
          className="w-full"
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}
