import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "./MoviePage.module.css"
import type { MovieDetails } from "../types"
import noPoster from "../assets/no-poster.jpg"
import { observer } from "mobx-react-lite"
import { favoritesStore } from "../store/favoriteStore"

export const MoviePage = observer(() => {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleAddToFavorites = () => {
    setShowModal(true)
  }

  const confirmAdd = () => {
    if (!movie) return
    favoritesStore.add({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path || "",
      overview: movie.overview,
    })
    setShowModal(false)
  }

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ru-RU`,
          {
            headers: {
              Authorization: import.meta.env.VITE_TMDB_TOKEN,
              accept: "application/json",
            },
          }
        )
        if (!res.ok) throw new Error("Ошибка при загрузке фильма")
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        console.error(err)
      }
    }

    getMovie()
  }, [id])

  if (!movie) return <p>Загрузка...</p>

  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noPoster
        }
        alt={movie.title}
      />
      <div className={styles.desc}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.text}>{movie.overview}</p>
        <p className={styles.text}>Рейтинг: {movie.vote_average}</p>
        <p className={styles.text}>Дата выхода: {movie.release_date}</p>
        <p className={styles.text}>
          Жанры: {movie.genres.map((g) => g.name).join(", ")}
        </p>

        <button
          onClick={() => {
            if (!movie) return
            if (favoritesStore.isFavorite(movie.id)) {
              favoritesStore.remove(movie.id)
            } else {
              handleAddToFavorites()
            }
          }}
          className={styles.button}
        >
          {favoritesStore.isFavorite(movie.id)
            ? "Убрать из избранного"
            : "В избранное"}
        </button>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>Добавить фильм в избранное?</p>
              <button onClick={confirmAdd}>Добавить</button>
              <button onClick={() => setShowModal(false)}>Отмена</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
