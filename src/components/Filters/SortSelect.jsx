import { useContext } from "react";
import { SORT_OPTIONS } from "../../context/podcastConstants";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./SortSelect.module.css";

/**
 * Dropdown for choosing sort order.
 */
export default function SortSelect() {
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
