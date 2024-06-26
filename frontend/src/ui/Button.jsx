import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  as = "button",
  type = "primary",
  size,
  href,
  disable = false,
  onClick,
  children,
  ...props
}) {
  const Component = as || "button";

  if (Component === "a") {
    return (
      <Link
        to={href}
        className={`${
          type === "secondary"
            ? styles.secondary
            : type === "tertiary"
            ? styles.tertiary
            : styles.primary
        } ${size === "small" ? styles.small : ""}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disable}
      className={`${
        type === "secondary"
          ? styles.secondary
          : type === "tertiary"
          ? styles.tertiary
          : type === "error"
          ? styles.error
          : styles.primary
      } ${
        size === "small"
          ? styles.small
          : size === "smallest"
          ? styles.smallest
          : ""
      } ${type === "secondary" && disable ? styles.disableSecondary : ""} ${
        type === "primary" && disable ? styles.disablePrimary : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
