import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../../context/PodcastContext";
import { formatDate } from "../../utils/formatDate";
import GenreTags from "../UI/GenreTags";
import styles from "./PodcastDetail.module.css";

function createEpisodeRecord(podcast, season, episode) {
  return {
    id: `${podcast.id}-${season.season}-${episode.episode}`,
    showId: podcast.id,
    showTitle: podcast.title,
    seasonNumber: season.season,
    episodeNumber: episode.episode,
    title: episode.title,
    description: episode.description,
    file: episode.file,
    image: season.image || podcast.image,
  };
}

/**
 * Detailed podcast page with season selector, episode playback, and favourites.
 */
export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const { isFavourite, setCurrentEpisode, toggleFavourite } = useContext(PodcastContext);
  const season = podcast.seasons[selectedSeasonIndex];
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.header}>
        <img src={podcast.image} alt={`${podcast.title} cover`} className={styles.cover} />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres || podcast.genres || []} />
              </div>

              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>

              <div>
                <p>Total Seasons:</p>
                <strong>{podcast.seasons.length} Seasons</strong>
              </div>

              <div>
                <p>Total Episodes:</p>
                <strong>
                  {podcast.seasons.reduce((acc, item) => acc + item.episodes.length, 0)} Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            <img className={styles.seasonCover} src={season.image} alt={`${season.title} cover`} />
            <div>
              <h3>
                Season {selectedSeasonIndex + 1}: {season.title}
              </h3>
              <p className={styles.releaseInfo}>{season.episodes.length} Episodes</p>
            </div>
          </div>
          <select
            value={selectedSeasonIndex}
            onChange={(event) => setSelectedSeasonIndex(Number(event.target.value))}
            className={styles.dropdown}
            aria-label="Choose season"
          >
            {podcast.seasons.map((item, index) => (
              <option key={item.season} value={index}>
                Season {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.episodeList}>
          {season.episodes.map((episode) => {
            const episodeRecord = createEpisodeRecord(podcast, season, episode);
            const favourite = isFavourite(episodeRecord.id);

            return (
              <div key={episodeRecord.id} className={styles.episodeCard}>
                <img className={styles.episodeCover} src={season.image} alt="" />
                <div className={styles.episodeInfo}>
                  <p className={styles.episodeTitle}>
                    Episode {episode.episode}: {episode.title}
                  </p>
                  <p className={styles.episodeDesc}>{episode.description}</p>
                </div>
                <div className={styles.episodeActions}>
                  <button type="button" onClick={() => toggleFavourite(episodeRecord)}>
                    {favourite ? "♥" : "♡"}
                  </button>
                  <button type="button" onClick={() => setCurrentEpisode(episodeRecord)}>
                    ▶ Play
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
