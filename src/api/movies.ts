export async function fetchMovies(
  page = 1,
  genres: number[] = [],
  minRating = 0,
  maxRating = 10,
  releaseYearStart = "",
  releaseYearEnd = ""
) {
  try {
    const params = [`language=ru-RU`, `page=${page}`]
    if (genres.length > 0) {
      params.push(`with_genres=${genres.join(",")}`)
    }
    if (minRating > 0) {
      params.push(`vote_average.gte=${minRating}`)
    }
    if (maxRating < 10) {
      params.push(`vote_average.lte=${maxRating}`)
    }
    if (releaseYearStart) {
      params.push(`primary_release_date.gte=${releaseYearStart}-01-01`)
    }
    if (releaseYearEnd) {
      params.push(`primary_release_date.lte=${releaseYearEnd}-12-31`)
    }
    const url = `https://api.themoviedb.org/3/discover/movie?${params.join(
      "&"
    )}`

    const res = await fetch(url, {
      headers: {
        Authorization: import.meta.env.VITE_TMDB_TOKEN,
        accept: "application/json",
      },
    })

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
