import type { Metadata } from 'next'

import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { getCinemaFilmByFilmId, getCinemaFilmByFilmIdSchedule, getCinemaFilms } from '@/api'
import { formatGenres } from '@/app/_utils/format-genres'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { getI18n } from '@/lib/i18n'

import { ScheduleSelector } from './_components/schedule-selector'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const film = await getCinemaFilmByFilmId({ path: { filmId: id } })

  return { title: `${film.data.film.name} | Cinema` }
}

export async function generateStaticParams() {
  const films = await getCinemaFilms().catch(() => ({ data: { films: [] } }))
  return films.data.films.map((film) => ({ id: film.id }))
}

export type TimeByHall = Record<string, Record<string, string[]>>

export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const filmResponse = await getCinemaFilmByFilmId({ path: { filmId: id } })
  const film = filmResponse.data.film
  const filmScheduleResponse = await getCinemaFilmByFilmIdSchedule({ path: { filmId: id } })
  const filmSchedules = filmScheduleResponse.data.schedules

  const timeByHall: TimeByHall = {}

  filmSchedules.forEach((schedule) => {
    timeByHall[schedule.date] ??= {}
    schedule.seances.forEach((seance) => {
      ;(timeByHall[schedule.date][seance.hall.name] ??= []).push(seance.time)
    })
  })

  const { t } = await getI18n()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <Typography tag="h1" variant="title-md">
          {t('film.about')}
        </Typography>
      </div>
      <div>
        <div className="py-[32px]">
          <div className="w-full relative aspect-2/3">
            <Image
              alt="Film poster"
              loading="eager"
              src={`/api${film.img}`}
              fill
              className="object-cover rounded-24"
            />
            <Badge type="special" className="absolute top-[16px] left-[16px] z-10">
              {film.userRatings.imdb}
            </Badge>
          </div>
          <div className="mt-[8px]">
            <Typography tag="h2" variant="body-lg">
              {film.name}
            </Typography>
            <Typography tag="p" variant="caption" className="text-surface">
              {formatGenres(film.genres)}
            </Typography>
          </div>
          <Typography variant="body-sm" className="mt-[16px]">
            {film.description}
          </Typography>
        </div>

        <Suspense>
          <ScheduleSelector film={film} schedules={filmSchedules} timeByHall={timeByHall} />
        </Suspense>
      </div>
    </div>
  )
}
