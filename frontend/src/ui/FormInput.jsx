import styles from "./FormInput.module.css";

function Input({
  placeholder = "",
  type = "text",
  isPassword,
  onHidePassword,
  children,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type={isPassword && type === "password" ? "password" : "text"}
          placeholder={placeholder}
          className={styles.searchInput}
          style={{ paddingRight: "33px" }}
        />
        {children && (
          <div className={styles.inputLabel}>
            <button className={styles.labelButton} onClick={onHidePassword}>
              <div className={styles.label}>{children}</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
