import { Link } from "react-router-dom";
import styles from "./SmallCard.module.css";
import { useEffect, useRef, useState } from "react";

function SmallCard({ title, name, price, url }) {
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
          src={url}
          alt=""
          style={{ height: imageHeight }}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.artworkTitle}>{title}</div>
        <div className={styles.artistName}>{name}</div>
        <div className={styles.artworkPrice}>₦{price}</div>
      </div>
    </Link>
  );
}

export default SmallCard;
