import styles from "./ButtonWithIcon.module.css";

function ButtonWithIcon({
  type = "primary",
  href,
  text = "",
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={`${type === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
      {...props}
    >
      {children && (
        <span className={styles.btnIcon}>
          <div className={styles.iconWrapper}>{children}</div>
        </span>
      )}
      {text}
    </button>
  );
}

export default ButtonWithIcon;
