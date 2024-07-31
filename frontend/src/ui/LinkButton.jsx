import styles from "./LinkButton.module.css";

function LinkButton({
  type = "",
  size = "",
  link = "",
  onClick,
  children,
  ...props
}) {
  return (
    <a
      href={link}
      className={`${type === "secondary" ? styles.secondary : styles.primary} ${
        size === "small" ? styles.smallBtn : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
}

export default LinkButton;
