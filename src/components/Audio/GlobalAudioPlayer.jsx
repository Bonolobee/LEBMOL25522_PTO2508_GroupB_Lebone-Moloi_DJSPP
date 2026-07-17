import { useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./GlobalAudioPlayer.module.css";

/**
 * Persistent bottom audio player available across all routes.
 */
export default function GlobalAudioPlayer() {
  const { currentEpisode } = useContext(PodcastContext);

  if (!currentEpisode) return null;

  return (
    <aside className={styles.playerShell} aria-label="Global audio player">
      <div className={styles.nowPlaying}>
        <img src={currentEpisode.image} alt="" />
        <div>
          <strong>{currentEpisode.title}</strong>
          <span>{currentEpisode.showTitle}</span>
        </div>
      </div>
      <AudioPlayer
        src={currentEpisode.file}
        autoPlayAfterSrcChange={false}
        showJumpControls
        showSkipControls={false}
        layout="horizontal"
      />
    </aside>
  );
}
