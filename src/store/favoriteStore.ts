import { makeAutoObservable } from "mobx"
import type { FavoriteMovie } from "../types"

class FavoritesStore {
  favorites: FavoriteMovie[] = []

  constructor() {
    makeAutoObservable(this)
    this.loadFromLocalStorage()
  }

  add(movie: FavoriteMovie) {
    if (!this.favorites.find((m) => m.id === movie.id)) {
      this.favorites.push(movie)
      this.saveToLocalStorage()
    }
  }

  remove(id: number) {
    this.favorites = this.favorites.filter((m) => m.id !== id)
    this.saveToLocalStorage()
  }

  isFavorite(id: number) {
    return this.favorites.some((m) => m.id === id)
  }

  private saveToLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites))
  }

  private loadFromLocalStorage() {
    const raw = localStorage.getItem("favorites")
    if (raw) {
      this.favorites = JSON.parse(raw)
    }
  }
}

export const favoritesStore = new FavoritesStore()
