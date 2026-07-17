import { createContext, useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../api/fetchPata";

export const PodcastContext = createContext();

export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A-Z" },
  { key: "title-desc", label: "Title Z-A" },
];

const FAVOURITES_KEY = "djspp:favourites";
const THEME_KEY = "djspp:theme";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Provides podcast data, filters, favourites, theme, and audio-player state.
 * @param {{children: import("react").ReactNode}} props
 */
export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [favourites, setFavourites] = useState(() => readStorage(FAVOURITES_KEY, []));
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, "light"));
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    fetchPodcasts(setAllPodcasts, setError, setLoading);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!currentEpisode) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentEpisode]);

  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  useEffect(() => {
    const calculatePageSize = () => {
      if (window.innerWidth <= 1024) {
        setPageSize(10);
        return;
      }
      setPageSize(Math.max(6, Math.floor(window.innerWidth / 260) * 2));
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  const filtered = useMemo(() => {
    let data = [...allPodcasts];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((podcast) =>
        [podcast.title, podcast.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(q))
      );
    }

    if (genre !== "all") {
      data = data.filter((podcast) => podcast.genres.includes(Number(genre)));
    }

    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      default:
        break;
    }

    return data;
  }, [allPodcasts, genre, search, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const podcasts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const recommendedShows = allPodcasts.slice(0, 12);

  const toggleTheme = () => setTheme((value) => (value === "dark" ? "light" : "dark"));

  const isFavourite = (episodeId) => favourites.some((item) => item.id === episodeId);

  const toggleFavourite = (episode) => {
    setFavourites((items) => {
      if (items.some((item) => item.id === episode.id)) {
        return items.filter((item) => item.id !== episode.id);
      }
      return [{ ...episode, addedAt: new Date().toISOString() }, ...items];
    });
  };

  const value = {
    allPodcasts,
    allPodcastsCount: filtered.length,
    currentEpisode,
    error,
    favourites,
    genre,
    isFavourite,
    loading,
    page: currentPage,
    podcasts,
    recommendedShows,
    search,
    setCurrentEpisode,
    setGenre,
    setPage,
    setSearch,
    setSortKey,
    sortKey,
    theme,
    toggleFavourite,
    toggleTheme,
    totalPages,
  };

  return <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>;
}
