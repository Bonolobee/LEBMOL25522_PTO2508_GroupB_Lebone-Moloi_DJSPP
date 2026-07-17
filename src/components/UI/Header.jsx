import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./Header.module.css";

/**
 * Global app header with navigation, favourites shortcut, and theme toggle.
 */
export default function Header() {
  const { favourites, theme, toggleTheme } = useContext(PodcastContext);

  return (
    <header className={styles.appHeader}>
      <Link className={styles.brand} to="/">
        <span aria-hidden="true">◎</span> PodcastApp
      </Link>

      <nav className={styles.nav} aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </nav>

      <div className={styles.actions}>
        <span aria-hidden="true">⌕</span>
        <NavLink className={styles.favouriteLink} to="/favourites" aria-label="Favourite episodes">
          ♥ <span>{favourites.length}</span>
        </NavLink>
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <span className={styles.avatar} aria-hidden="true">LM</span>
      </div>
    </header>
  );
}
