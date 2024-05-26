import styles from "./FilterSort.module.css";

function FilterSort({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default FilterSort;
