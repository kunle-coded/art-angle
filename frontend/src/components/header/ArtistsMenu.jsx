import { Link } from "react-router-dom";
import styles from "./ArtistsMenu.module.css";
import { useEffect, useRef } from "react";

function ArtistsMenu({ children, link }) {
  const imageRef = useRef(null);

  useEffect(() => {
    if (link === "artworks") {
      imageRef.current.style.backgroundImage = "url(megaMenuImg.png)";
    }
  }, [link]);

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menu}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Link to={`/${link}`}>
              <div ref={imageRef} className={styles.imageBox}>
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
