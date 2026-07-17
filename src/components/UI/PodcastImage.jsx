import { useEffect, useState } from "react";

const FALLBACK_SRC = "/podcast-placeholder.svg";

export default function PodcastImage({ src, alt = "", className, ...props }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_SRC);

  useEffect(() => {
    setImageSrc(src || FALLBACK_SRC);
  }, [src]);

  const handleError = () => {
    if (imageSrc !== FALLBACK_SRC) {
      setImageSrc(FALLBACK_SRC);
    }
  };

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
}
