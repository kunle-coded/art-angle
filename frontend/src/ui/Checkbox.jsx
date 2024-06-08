import styles from "./Checkbox.module.css";

function Checkbox({ label, index, selected, onCheck }) {
  return (
    <label
      role="radio"
      aria-checked={selected === index}
      className={`${styles.checkContainer} ${
        selected === index ? styles.active : ""
      }`}
      onClick={() => onCheck(index, label)}
    >
      <div className={styles.checkBox}>
        <div
          className={`${styles.check} ${
            selected === index ? styles.checked : ""
          }`}
        ></div>
      </div>
      <div className={styles.labelContainer}>
        <div className={styles.label}>{label}</div>
      </div>
    </label>
  );
}

export default Checkbox;
