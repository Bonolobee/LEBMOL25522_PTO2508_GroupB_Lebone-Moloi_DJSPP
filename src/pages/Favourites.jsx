import { useContext, useMemo, useState } from "react";
import { PodcastContext } from "../context/PodcastContext";
import PodcastImage from "../components/UI/PodcastImage";
import styles from "./Favourites.module.css";

/**
 * Page for saved favourite episodes, grouped by show.
 */
export default function Favourites() {
  const { favourites, setCurrentEpisode, toggleFavourite } = useContext(PodcastContext);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilter, setShowFilter] = useState("all");

  const shows = [...new Set(favourites.map((item) => item.showTitle))].sort();

  const visible = useMemo(() => {
    const filtered = showFilter === "all"
      ? [...favourites]
      : favourites.filter((item) => item.showTitle === showFilter);

    filtered.sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return new Date(b.addedAt) - new Date(a.addedAt);
    });

    return filtered;
  }, [favourites, showFilter, sortBy]);

  const grouped = visible.reduce((groups, episode) => {
    groups[episode.showTitle] = [...(groups[episode.showTitle] || []), episode];
    return groups;
  }, {});

  return (
    <main className={styles.page}>
      <h1>Favourite Episodes</h1>
      <p>Your saved episodes from all shows</p>

      <section className={styles.controls}>
        <label>
          Sort by:
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="title-asc">Episode A-Z</option>
            <option value="title-desc">Episode Z-A</option>
          </select>
        </label>
        <label>
          Show:
          <select value={showFilter} onChange={(event) => setShowFilter(event.target.value)}>
            <option value="all">All Shows</option>
            {shows.map((show) => (
              <option key={show} value={show}>{show}</option>
            ))}
          </select>
        </label>
      </section>

      {!visible.length && <p className={styles.empty}>No favourite episodes yet.</p>}

      {Object.entries(grouped).map(([showTitle, episodes]) => (
        <section key={showTitle} className={styles.group}>
          <h2>{showTitle} <span>({episodes.length} episodes)</span></h2>
          {episodes.map((episode) => (
            <article className={styles.item} key={episode.id}>
              <PodcastImage src={episode.image} alt="" />
              <div>
                <h3>{episode.title}</h3>
                <p>Season {episode.seasonNumber} • Episode {episode.episodeNumber}</p>
                <p>{episode.description}</p>
                <small>Added {new Date(episode.addedAt).toLocaleString()}</small>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => toggleFavourite(episode)}>♥</button>
                <button type="button" onClick={() => setCurrentEpisode(episode)}>▶ Play</button>
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}
