import { useContext } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../context/PodcastContext";
import GenreTags from "./UI/GenreTags";
import styles from "./RecommendedCarousel.module.css";

const settings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 420,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    { breakpoint: 1100, settings: { slidesToShow: 4 } },
    { breakpoint: 820, settings: { slidesToShow: 2 } },
    { breakpoint: 560, settings: { slidesToShow: 1 } },
  ],
};

/**
 * Horizontally scrollable recommended shows carousel.
 */
export default function RecommendedCarousel() {
  const { recommendedShows } = useContext(PodcastContext);
  const navigate = useNavigate();

  if (!recommendedShows.length) return null;

  return (
    <section className={styles.carouselSection}>
      <h2>Recommended Shows</h2>
      <Slider {...settings}>
        {recommendedShows.map((show) => (
          <button
            type="button"
            className={styles.recommendedCard}
            key={show.id}
            onClick={() => navigate(`/show/${show.id}`, { state: { genres: show.genres } })}
          >
            <img src={show.image} alt={`${show.title} cover`} />
            <strong>{show.title}</strong>
            <GenreTags genres={show.genres.slice(0, 2)} />
          </button>
        ))}
      </Slider>
    </section>
  );
}
