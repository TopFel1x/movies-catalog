import { observer } from "mobx-react-lite"
import { favoritesStore } from "../store/favoriteStore"
import { Link } from "react-router-dom"
import noPoster from "../assets/no-poster.jpg"
import styles from "./FavoritesPage.module.css"

export const FavoritesPage = observer(() => {
  const favorites = favoritesStore.favorites

  if (favorites.length === 0) {
    return <p style={{ padding: "2rem" }}>Список избранного пуст</p>
  }

  return (
    <>
      <h1 className="h1">Избранное</h1>
      <div className={styles.container}>
        {favorites.map((movie) => (
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
          </Link>
        ))}
      </div>
    </>
  )
})
