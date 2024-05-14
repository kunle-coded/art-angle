import { Link } from "react-router-dom";
import styles from "./MegaFooter.module.css";

function MegaFooter() {
  return (
    <div className={styles.megaFooter}>
      <div className={styles.footerTitle}>Browse by name</div>
      <div className={styles.footerContent}>
        <Link to="/artists/artists-starting-with-a" className={styles.letter}>
          A
        </Link>
        <Link to="/artists/artists-starting-with-b" className={styles.letter}>
          B
        </Link>
        <Link to="/artists/artists-starting-with-c" className={styles.letter}>
          C
        </Link>
        <Link to="/artists/artists-starting-with-d" className={styles.letter}>
          D
        </Link>
        <Link to="/artists/artists-starting-with-e" className={styles.letter}>
          E
        </Link>
        <Link to="/artists/artists-starting-with-f" className={styles.letter}>
          F
        </Link>
        <Link to="/artists/artists-starting-with-g" className={styles.letter}>
          G
        </Link>
        <Link to="/artists/artists-starting-with-h" className={styles.letter}>
          H
        </Link>
        <Link to="/artists/artists-starting-with-i" className={styles.letter}>
          I
        </Link>
        <Link to="/artists/artists-starting-with-j" className={styles.letter}>
          J
        </Link>
        <Link to="/artists/artists-starting-with-k" className={styles.letter}>
          K
        </Link>
        <Link to="/artists/artists-starting-with-l" className={styles.letter}>
          L
        </Link>
        <Link to="/artists/artists-starting-with-m" className={styles.letter}>
          M
        </Link>
        <Link to="/artists/artists-starting-with-n" className={styles.letter}>
          N
        </Link>
        <Link to="/artists/artists-starting-with-o" className={styles.letter}>
          O
        </Link>
        <Link to="/artists/artists-starting-with-p" className={styles.letter}>
          P
        </Link>
        <Link to="/artists/artists-starting-with-q" className={styles.letter}>
          Q
        </Link>
        <Link to="/artists/artists-starting-with-r" className={styles.letter}>
          R
        </Link>
        <Link to="/artists/artists-starting-with-s" className={styles.letter}>
          S
        </Link>
        <Link to="/artists/artists-starting-with-t" className={styles.letter}>
          T
        </Link>
        <Link to="/artists/artists-starting-with-u" className={styles.letter}>
          U
        </Link>
        <Link to="/artists/artists-starting-with-v" className={styles.letter}>
          V
        </Link>
        <Link to="/artists/artists-starting-with-w" className={styles.letter}>
          W
        </Link>
        <Link to="/artists/artists-starting-with-x" className={styles.letter}>
          X
        </Link>
        <Link to="/artists/artists-starting-with-y" className={styles.letter}>
          Y
        </Link>
        <Link to="/artists/artists-starting-with-z" className={styles.letter}>
          Z
        </Link>
      </div>
    </div>
  );
}

export default MegaFooter;
