export function formatGenres(genres: Array<string>) {
  if (genres.length === 0) return ''
  return genres[0][0].toUpperCase() + genres.join(', ').slice(1)
}
