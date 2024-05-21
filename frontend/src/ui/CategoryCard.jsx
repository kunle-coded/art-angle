import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ imgUrl, title }) {
  return (
    <li className={styles.cardContainer}>
      <Link className={styles.link}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={imgUrl} alt="" className={styles.img} />
          </div>
          <div className={styles.text}>{title}</div>
        </div>
      </Link>
    </li>
  );
}

export default CategoryCard;
