import styles from "./LinkButton.module.css";

function LinkButton({ type = "", link, onClick, children, ...props }) {
  return (
    <a
      href={link}
      className={`${type === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
}

export default LinkButton;
