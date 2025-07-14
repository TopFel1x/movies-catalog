import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// My imports
import { fetchMovies, fetchGenres } from "../api/movies"
import type { Movie, Genre } from "../types"
import styles from "./HomePage.module.css"
import { Filters } from "../components/Filters"
import noPoster from "../assets/no-poster.jpg"

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1)

  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(10)

  const [releaseYearStart, setReleaseYearStart] = useState("")
  const [releaseYearEnd, setReleaseYearEnd] = useState("")

  useEffect(() => {
    async function getMovies() {
      setLoading(true)
      const data = await fetchMovies(
        page,
        selectedGenres,
        minRating,
        maxRating,
        releaseYearStart,
        releaseYearEnd
      )
      setMovies((prev) => {
        const newMovies = data?.results || []
        const ids = new Set(prev.map((m) => m.id))
        const uniqueNew = newMovies.filter((movie: Movie) => !ids.has(movie.id))
        return page === 1 ? newMovies : [...prev, ...uniqueNew]
      })
      setLoading(false)
    }

    getMovies()
  }, [
    page,
    selectedGenres,
    minRating,
    maxRating,
    releaseYearStart,
    releaseYearEnd,
  ])

  // Скролл
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading
      ) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading])

  // Жанры
  useEffect(() => {
    async function getGenres() {
      const data = await fetchGenres()
      setGenres(data)
    }
    getGenres()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [selectedGenres, minRating, maxRating, releaseYearStart, releaseYearEnd])

  return (
    <div>
      <Filters
        genres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        minRating={minRating}
        setMinRating={setMinRating}
        maxRating={maxRating}
        setMaxRating={setMaxRating}
        releaseYearStart={releaseYearStart}
        setReleaseYearStart={setReleaseYearStart}
        releaseYearEnd={releaseYearEnd}
        setReleaseYearEnd={setReleaseYearEnd}
      />

      {loading && <div>Загрузка...</div>}
      <div className={styles.container}>
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className={styles.card}
          >
            <img
              className={styles.poster}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : noPoster
              }
              alt={movie.title}
            />

            <h3 className={styles.title}>{movie.title}</h3>
            <div>Год: {movie.release_date?.slice(0, 4) || "—"}</div>
            <div>Рейтинг: {movie.vote_average || "—"}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
