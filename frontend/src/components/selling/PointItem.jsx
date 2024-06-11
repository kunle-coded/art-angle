import styles from "./PointItem.module.css";

function PointItem({ children, title = "", body = "" }) {
  return (
    <div className={styles.gridItem}>
      <div className={styles.contents}>
        <div className={styles.icon}>{children}</div>
        <div className={styles.heading}>{title}</div>
        <div className={styles.body}>{body}</div>
      </div>
      <div className={styles.gridContain}></div>
    </div>
  );
}

export default PointItem;
