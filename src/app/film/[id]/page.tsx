import type { Metadata } from 'next'

import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getCinemaFilmByFilmId, getCinemaFilmByFilmIdSchedule, getCinemaFilms } from '@/api'
import { formatGenres } from '@/app/_utils/format-genres'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'

import { ScheduleSelector } from './_components/schedule-selector'
import { groupTimeByHall } from './_utils/group-time-by-hall'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const film = await getCinemaFilmByFilmId({ path: { filmId: id } })

  return { title: `${film.data.film.name} | Cinema` }
}

export async function generateStaticParams() {
  const films = await getCinemaFilms()
  return films.data.films.map((film) => ({
    id: film.id,
  }))
}

export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const film = await getCinemaFilmByFilmId({ path: { filmId: id } })
  const filmSchedule = await getCinemaFilmByFilmIdSchedule({ path: { filmId: id } })
  const timeByHall = groupTimeByHall(filmSchedule)

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <Typography tag="h1" variant="title-md">
          О фильме
        </Typography>
      </div>
      <div>
        <div className="py-[32px]">
          <div className="w-full relative aspect-2/3">
            <Image
              alt="Film poster"
              loading="eager"
              src={`/api${film.data.film.img}`}
              fill
              className="object-cover rounded-24"
            />
            <Badge type="special" className="absolute top-[16px] left-[16px] z-10">
              {film.data.film.userRatings.imdb}
            </Badge>
          </div>
          <div className="mt-[8px]">
            <Typography tag="h2" variant="body-lg">
              {film.data.film.name}
            </Typography>
            <Typography tag="p" variant="caption" className="text-surface">
              {formatGenres(film.data.film.genres)}
            </Typography>
          </div>
          <Typography variant="body-sm" className="mt-[16px]">
            {film.data.film.description}
          </Typography>
        </div>

        <ScheduleSelector film={film} filmSchedule={filmSchedule} timeByHall={timeByHall} />
      </div>
    </div>
  )
}
