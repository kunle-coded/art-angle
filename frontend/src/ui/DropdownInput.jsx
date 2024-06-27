import DropdownIcon from "../components/icons/DropdownIcon";
import styles from "./DropdownInput.module.css";

function DropdownInput({ title = "" }) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.innerWrapper}>
        <div className={styles.inputDropdown}>
          <div className={styles.dropdownIcon}>
            <DropdownIcon />
          </div>
          <div className={styles.dropdownTitle}>{title}</div>
        </div>
      </div>
      <div className={styles.innerWrap}></div>
      <div className={styles.innerWrap}></div>
    </div>
  );
}

export default DropdownInput;
