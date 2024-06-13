import { Link } from "react-router-dom";
import styles from "./ArtworkScrollCard.module.css";
import { useRef, useState } from "react";
import Heart from "./Heart";

function ArtworkScrollCard({ poster }) {
  const [paddingBottom, setPaddingBottom] = useState("100%");

  const imageRef = useRef(null);

  const handleImageLoad = () => {
    const image = imageRef.current;
    if (image) {
      const aspectRatio = (image.naturalHeight / image.naturalWidth) * 100;
      setPaddingBottom(`${aspectRatio}%`);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <li className={`card ${styles.container}`}>
      <div
        className={styles.imageContainer}
        style={{ paddingBottom: paddingBottom }}
      >
        <Link aria-label={poster.title} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageCompact}>
              <img
                ref={imageRef}
                src={poster.url}
                alt={`${poster.title} by ${poster.artist}`}
                className={styles.image}
                onLoad={handleImageLoad}
                onContextMenu={handleContextMenu}
              />
            </div>
          </div>
        </Link>
      </div>
      <Link className={styles.posterContent}>
        <div className={styles.posterInfo}>
          <div className={styles.posterTitle}>
            <div className={styles.title}>{poster.title}</div>
            <Heart />
          </div>
          <div className={styles.posterName}>
            {poster.artist}, <span>{poster.year}</span>
          </div>
          <div className={styles.posterMedium}>{poster.medium}</div>
          <div className={styles.posterPrice}>₦{poster.price}</div>
        </div>
      </Link>
      <div style={{ height: "40px" }}></div>
    </li>
  );
}

export default ArtworkScrollCard;
