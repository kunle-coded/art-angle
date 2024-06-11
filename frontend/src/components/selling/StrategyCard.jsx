import styles from "./StrategyCard.module.css";

function StrategyCard({ big = false, title = "", body = "", imgUrl = "" }) {
  return (
    <div className={styles.gridItem}>
      <div className={styles.innerWrapper}>
        <div className={styles.itemContainer}>
          <div className={`${styles.itemImage} ${big ? styles.bigImage : ""}`}>
            <img src={imgUrl} alt="" className={styles.image} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.heading}>{title}</div>
            <div className={styles.body}>{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrategyCard;
