import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchPata";
import { Loading, Error, PodcastDetail } from "../components";

/**
 * ShowDetail page component for displaying detailed information about a single podcast.
 *
 * - Extracts the podcast ID from the URL using React Router's `useParams`.
 * - Optionally retrieves genre data from navigation state via `useLocation`.
 * - Fetches podcast data from the API on mount using `fetchSinglePodcast`.
 * - Displays a loading state, error message, or the detailed podcast view.
 *
 * Components used:
 * - `Loading` while fetching data
 * - `Error` if fetch fails
 * - `PodcastDetail` when data is successfully retrieved
 *
 * @returns {JSX.Element} The detailed view of a selected podcast.
 */
export default function ShowDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { genres } = location.state || {};

  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, []);
  return (
    <>
      {loading && <Loading message="Loading podcast..." />}

      {error && (
        <Error message={`Error occurred while fetching podcast: ${error}`} />
      )}
      {!loading && !error && (
        <PodcastDetail podcast={podcast} genres={genres} />
      )}
    </>
  );
}
