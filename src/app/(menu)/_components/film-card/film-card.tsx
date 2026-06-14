import Image from 'next/image'
import Link from 'next/link'

import type { Film } from '@/api'

import { formatGenres } from '@/app/_utils/format-genres'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

interface FilmCardProps {
  film: Film
  withActors?: boolean
}

export function FilmCard({ film, withActors }: FilmCardProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full relative aspect-2/3">
        <Image alt="film poster" src={`/api${film.img}`} className="rounded-3xl" fill />
        <Badge type="special" className="absolute top-4 left-4 z-10">
          {film.userRatings.imdb}
        </Badge>
      </div>

      <div>
        <Typography tag="h3" variant="body-md" className="line-clamp-1">
          {film.name}
        </Typography>
        <Typography tag="p" variant="caption" className="line-clamp-1 text-surface">
          {formatGenres(film.genres)}
        </Typography>
      </div>

      {withActors && (
        <div>
          <Typography tag="h4" variant="body-sm" className="mb-[8px]">
            Актёры
          </Typography>
          <div className="flex w-full justify-between overflow-x-auto gap-[8px] no-scrollbar scroll-smooth -mr-[12px]">
            {film.actors.slice(0, 4).map((actor) => (
              <div key={actor.id} className="flex flex-col items-center gap-[8px] w-[72px]">
                <div className="size-[72px] bg-zinc-200 rounded-infinite" />
                <Typography
                  tag="p"
                  variant="caption"
                  className="text-center text-surface line-clamp-2"
                >
                  {actor.fullName}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/film/${film.id}`}
        className={buttonVariants({ size: 'large', className: 'w-full' })}
      >
        Подробнее
      </Link>
    </div>
  )
}
