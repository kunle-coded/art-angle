import { Link } from "react-router-dom";
import styles from "./SmallCard.module.css";
import { useEffect, useRef, useState } from "react";
import formatCurrency from "../helpers/formatCurrency";

function SmallCard({ artwork }) {
  const [imageHeight, setImageHeight] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.clientWidth;
      setImageHeight(height);
    }
  }, []);

  return (
    <Link ref={cardRef} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={artwork.images[0]}
          alt={`${artwork.title} by ${artwork.artist}`}
          style={{ height: imageHeight }}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.artworkTitle}>{artwork.title}</div>
        <div className={styles.artistName}>{artwork.artist}</div>
        <div className={styles.artworkPrice}>
          {formatCurrency(artwork.price)}
        </div>
      </div>
    </Link>
  );
}

export default SmallCard;
