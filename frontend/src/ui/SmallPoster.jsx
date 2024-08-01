import { useEffect, useRef, useState } from "react";
import styles from "./SmallPoster.module.css";
import Heart from "./Heart";
import formatCurrency from "../helpers/formatCurrency";

function SmallPoster({ artwork, type, link }) {
  const [imageHeight, setImageHeight] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.clientWidth;
      setImageHeight(height);
    }
  }, []);

  return (
    <li ref={cardRef} className={styles.posterContainer}>
      <a
        aria-label={`${artwork.title} by ${artwork.artist}`}
        href={link}
        className={styles.poster}
      >
        <div className={styles.posterWrapper}>
          <div className={styles.posterImage}>
            <img
              src={artwork.images[0]}
              alt={`${artwork.title} by ${artwork.artist}`}
              className={styles.image}
              style={{ height: imageHeight }}
            />
          </div>
          <div className={styles.posterContent}>
            <div className={styles.posterTitle}>
              <div className={styles.title}>{artwork.title}</div>
              {type === "buyer" && <Heart />}
            </div>
            <div className={styles.posterName}>
              {artwork.artist}, <span>{artwork.year}</span>
            </div>
            <div className={styles.posterMedium}>{artwork.medium}</div>
            <div className={styles.posterPrice}>
              {formatCurrency(artwork.price)}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default SmallPoster;
