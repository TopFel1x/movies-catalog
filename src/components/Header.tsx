import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        Фильмы
      </Link>
      <Link to="/favorites" className={styles.link}>
        Избранное
      </Link>
    </nav>
  </header>
)
