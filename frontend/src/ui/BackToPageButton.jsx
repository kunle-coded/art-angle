import styles from "./BackToPageButton.module.css";

function BackToPageButton({ label = "" }) {
  return (
    <button className={styles.btnContainer}>
      <div className={styles.icon}>
        <BackToPageButton />
      </div>
      <div className={styles.label}>{label}</div>
    </button>
  );
}

export default BackToPageButton;
