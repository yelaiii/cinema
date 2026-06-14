import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft'

import type { ScheduleResponse } from '@/api'

export type TimeByHall = Record<string, Record<string, string[]>>

export function groupTimeByHall(
  filmSchedule: ApicraftFetchesResponse<ScheduleResponse>,
): TimeByHall {
  const timeByHall: TimeByHall = {}

  filmSchedule.data.schedules.forEach((schedule) => {
    timeByHall[schedule.date] ??= {}
    schedule.seances.forEach((seance) => {
      ;(timeByHall[schedule.date][seance.hall.name] ??= []).push(seance.time)
    })
  })

  return timeByHall
}
