import styles from "./ArtworkGrid.module.css";

function ArtworkGrid({ children }) {
  return (
    <div>
      <div className={styles.gridContainer}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridInnerEl}></div>
          <div className={styles.gridInnerWrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkGrid;
