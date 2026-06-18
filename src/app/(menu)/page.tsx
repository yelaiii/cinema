import { getCinemaFilms } from '@/api'
import { Typography } from '@/components/ui/typography'

import { FilmCard } from './_components/film-card'

export const revalidate = 86400

export default async function HomePage() {
  const filmsResponse = await getCinemaFilms()
  const films = filmsResponse.data.films

  return (
    <div>
      <div className="md:hidden h-14 flex items-center">
        <Typography tag="h1" variant="title-md">
          Фильмы
        </Typography>
      </div>
      <div className="flex flex-col gap-[40px] py-6 pb-40">
        <FilmCard film={films[0]} />

        <div className="flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth -mr-4 pr-5 flex-1">
          {films.slice(1, 5).map((film) => (
            <div key={film.id} className="w-[255px] shrink-0">
              <FilmCard film={film} />
            </div>
          ))}
        </div>

        <FilmCard withActors film={films[5]} />

        <div className="flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth -mr-4 pr-5 flex-1">
          {films.slice(6, 10).map((film) => (
            <div key={film.id} className="w-[255px] shrink-0">
              <FilmCard film={film} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
