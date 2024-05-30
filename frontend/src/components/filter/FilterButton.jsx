import styles from "./FilterButton.module.css";

function FilterButton({ text, left = false, children }) {
  return (
    <div>
      <button
        aria-expanded="false"
        aria-haspopup
        className={styles.filterButton}
        style={{ flexDirection: left ? "row-reverse" : "unset" }}
      >
        <div className={styles.text}>{text}</div>
        <div className={styles.icon}>{children}</div>
      </button>
    </div>
  );
}

export default FilterButton;
