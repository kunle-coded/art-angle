import styles from "./FilterComponent.module.css";

function FilterComponent({ children }) {
  return (
    <div className={styles.filter}>
      <div className={styles.wrapper}>
        <div className={styles.innerContainer}>
          <div className={styles.contents}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
