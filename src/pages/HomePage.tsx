import { useState, useEffect } from "react"

// My imports
import { fetchMovies } from "../api/movies"
import type { Movie } from "../types"
import styles from "./HomePage.module.css"

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function getMovies() {
      setLoading(true)
      const data = await fetchMovies(page)
      setMovies((prev) => {
        const newMovies = data?.results || []
        const ids = new Set(prev.map((m) => m.id))
        const uniqueNew = newMovies.filter((movie: Movie) => !ids.has(movie.id))
        return page === 1 ? newMovies : [...prev, ...uniqueNew]
      })

      setLoading(false)
    }

    getMovies()
  }, [page])

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

  return (
    <div>
      <h1>Фильмы</h1>
      {loading && <div>Загрузка...</div>}
      <div className={styles.container}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />

            <h3 className={styles.title}>{movie.title}</h3>
            <div>Год: {movie.release_date?.slice(0, 4) || "—"}</div>
            <div>Рейтинг: {movie.vote_average || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
