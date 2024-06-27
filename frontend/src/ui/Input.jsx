import styles from "./Input.module.css";

function Input({ placeholder = "", label = "", size = "" }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type="text"
          placeholder={placeholder}
          className={`${styles.searchInput} ${
            size === "small" ? styles.small : ""
          }`}
          style={{ paddingRight: "33px" }}
        />
        {label && (
          <div className={styles.inputLabel}>
            <div className={styles.label}>{label}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
