import { Link } from "react-router-dom";
import styles from "./CategoryCardSmall.module.css";

function CategoryCardSmall({ category }) {
  return (
    <div className={styles.cardContainer}>
      <Link className={styles.link}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              <img src={category.url} alt="" className={styles.img} />
            </div>
          </div>
          <div className={styles.text}>{category.title}</div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCardSmall;
