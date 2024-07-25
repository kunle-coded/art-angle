import BackIcon from "../components/icons/BackIcon";
import styles from "./BackToPageButton.module.css";

function BackToPageButton({ label = "", link }) {
  return (
    <a href={link} className={styles.btnContainer}>
      <div className={styles.icon}>
        <BackIcon />
      </div>
      <div className={styles.label}>{label}</div>
    </a>
  );
}

export default BackToPageButton;
