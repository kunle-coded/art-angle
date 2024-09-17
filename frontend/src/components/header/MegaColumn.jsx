import { Link } from "react-router-dom";
import styles from "./MegaColumn.module.css";

function MegaColumn({ type = "", menuItems, columnTitle, linkText, onLink }) {
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
            onClick={onLink}
          >
            {linkText}
          </Link>
        ) : (
          menuItems.map((item) => (
            <Link
              to={`/${type === "artworks" ? "collection" : "artists"}/${item
                .split(" ")[0]
                .toLowerCase()}`}
              key={item}
              className={styles.categoryLink}
              onClick={onLink}
            >
              {item}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default MegaColumn;
