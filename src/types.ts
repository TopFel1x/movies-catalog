export type Movie = {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[] // Жанры фильма
}

export type Genre = {
  id: number
  name: string
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genres: Genre[]
}

export type FavoriteMovie = {
  id: number
  title: string
  poster_path: string
  overview: string
}
