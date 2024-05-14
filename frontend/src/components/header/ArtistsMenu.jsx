import { Link } from "react-router-dom";
import styles from "./ArtistsMenu.module.css";

function ArtistsMenu({ children, link }) {
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menu}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Link to={`/${link}`}>
              <div className={styles.imageBox}>
                <div className={styles.imageText}>{link}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ArtistsMenu;
