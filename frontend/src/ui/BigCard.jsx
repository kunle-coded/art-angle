import { Link } from "react-router-dom";
import styles from "./BigCard.module.css";

function BigCard({ artwork }) {
  return (
    <div className={styles.cardContainer}>
      <Link className={styles.link}>
        <div className={styles.cardImage}>
          <img
            src={`../assets/images/${artwork.imgUrl}`}
            alt=""
            className={styles.image}
          />
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.cardTitle}>{artwork.title}</div>
          <div className={styles.cardInfo}>{artwork.date}</div>
        </div>
      </Link>
    </div>
  );
}

export default BigCard;
