export async function fetchMovies(page = 1) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=ru-RU&page=${page}`,
      {
        headers: {
          Authorization: import.meta.env.VITE_TMDB_TOKEN,
          accept: "application/json",
        },
      }
    )

    if (!res.ok) throw new Error("Ошибка при получении фильмов")
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchGenres() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=ru-RU",
      {
        headers: {
          Authorization: import.meta.env.VITE_TMDB_TOKEN,
          accept: "application/json",
        },
      }
    )
    if (!res.ok) throw new Error("Ошибка при получении жанров")
    const data = await res.json()
    return data.genres || []
  } catch (error) {
    console.error(error)
    return []
  }
}
