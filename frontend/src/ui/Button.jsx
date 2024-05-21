import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  as = "button",
  type = "primary",
  size,
  href,
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
          type === "secondary" ? styles.secondary : styles.primary
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
      className={`${type === "secondary" ? styles.secondary : styles.primary} ${
        size === "small" ? styles.small : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
