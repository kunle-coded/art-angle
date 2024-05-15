import { Link } from "react-router-dom";
import styles from "./MegaColumn.module.css";

function MegaColumn({ menuItems, columnTitle, linkText }) {
  return (
    <div className={`${styles.menu} ${linkText ? styles.bottomColumn : ""}`}>
      <div className={styles.categoryContainer}>
        {columnTitle ? (
          <div className={styles.menuTitle}>{columnTitle}</div>
        ) : null}
        {linkText ? (
          <Link
            to={`/${linkText.includes("Artworks") ? "artworks" : "artists"}`}
            className={styles.categoryLink}
          >
            {linkText}
          </Link>
        ) : (
          menuItems.map((item) => (
            <Link key={item} className={styles.categoryLink}>
              {item}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default MegaColumn;
