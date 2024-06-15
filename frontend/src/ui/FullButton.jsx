import styles from "./FullButton.module.css";

function FullButton({ type = "", disable, onClick, children, ...props }) {
  return (
    <button
      aria-disabled={disable}
      disabled={disable}
      className={`${
        type === "secondary" ? styles.secondary : styles.primary
      }  ${type === "secondary" && disable ? styles.disableSecondary : ""} ${
        disable && type === "" ? styles.disablePrimary : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default FullButton;
