import { Link } from "react-router-dom";
import styles from "./Poster.module.css";
import Heart from "./Heart";
import formatCurrency from "../helpers/formatCurrency";

function Poster({ poster }) {
  return (
    <div className={styles.posterContainer}>
      <Link
        aria-label={`${poster.title} by ${poster.artist}`}
        to="/"
        className={styles.poster}
      >
        <div className={styles.posterWrapper}>
          <div className={styles.posterImage}>
            <img
              src={poster.images[0]}
              alt={`${poster.title} by ${poster.artist}`}
              className={styles.image}
            />
          </div>
          <div className={styles.posterContent}>
            <div className={styles.posterTitle}>
              <div className={styles.title}>{poster.title}</div>
              <Heart />
            </div>
            <div className={styles.posterName}>
              {poster.artist}, <span>{poster.year}</span>
            </div>
            <div className={styles.posterMedium}>{poster.medium}</div>
            <div className={styles.posterPrice}>
              {formatCurrency(poster.price)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Poster;
