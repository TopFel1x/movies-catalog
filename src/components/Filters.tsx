import React from "react"
import type { Genre } from "../types"

type FiltersProps = {
  genres: Genre[]
  selectedGenres: number[]
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>
  minRating: number
  setMinRating: React.Dispatch<React.SetStateAction<number>>
  maxRating: number
  setMaxRating: React.Dispatch<React.SetStateAction<number>>
  releaseYearStart: string
  setReleaseYearStart: React.Dispatch<React.SetStateAction<string>>
  releaseYearEnd: string
  setReleaseYearEnd: React.Dispatch<React.SetStateAction<string>>
}

export const Filters: React.FC<FiltersProps> = ({
  genres,
  selectedGenres,
  setSelectedGenres,
  minRating,
  setMinRating,
  maxRating,
  setMaxRating,
  releaseYearStart,
  setReleaseYearStart,
  releaseYearEnd,
  setReleaseYearEnd,
}) => (
  <div>
    <h2>Жанры</h2>
    <div>
      {genres.map((genre) => (
        <label key={genre.id} style={{ marginRight: 10 }}>
          <input
            type="checkbox"
            value={genre.id}
            checked={selectedGenres.includes(genre.id)}
            onChange={(e) => {
              const id = Number(e.target.value)
              setSelectedGenres((prev) =>
                prev.includes(id)
                  ? prev.filter((gid) => gid !== id)
                  : [...prev, id]
              )
            }}
          />
          {genre.name}
        </label>
      ))}
    </div>

    <div style={{ marginTop: 16 }}>
      <h2>Рейтинг</h2>
      <input
        type="number"
        min={0}
        max={10}
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        style={{ width: 60, marginRight: 8 }}
      />
      –
      <input
        type="number"
        min={0}
        max={10}
        value={maxRating}
        onChange={(e) => setMaxRating(Number(e.target.value))}
        style={{ width: 60, marginLeft: 8 }}
      />
    </div>

    <div style={{ marginTop: 16 }}>
      <h2>Год выпуска</h2>
      <input
        type="number"
        min={1900}
        max={2099}
        value={releaseYearStart}
        onChange={(e) => setReleaseYearStart(e.target.value)}
        style={{ width: 80, marginRight: 8 }}
        placeholder="от"
      />
      –
      <input
        type="number"
        min={1900}
        max={2099}
        value={releaseYearEnd}
        onChange={(e) => setReleaseYearEnd(e.target.value)}
        style={{ width: 80, marginLeft: 8 }}
        placeholder="до"
      />
    </div>
  </div>
)
