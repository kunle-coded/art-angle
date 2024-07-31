import styles from "./Input.module.css";

function Input({
  placeholder = "",
  label = "",
  type = "",
  size = "",
  ...props
}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          className={`${styles.searchInput} ${
            size === "small" ? styles.small : ""
          }`}
          style={label ? { paddingRight: "33px" } : {}}
          {...props}
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
