import { useState } from "react";
import DropdownIcon from "../components/icons/DropdownIcon";
import styles from "./DropdownInput.module.css";
import CheckIcon from "../components/icons/CheckIcon";

function DropdownInput({ title = "", isCheck, children }) {
  const [isDropdown, setIsDropdown] = useState(false);

  function handleDropdown() {
    setIsDropdown((prevState) => !prevState);
  }

  return (
    <div className={styles.inputContainer}>
      <div className={styles.innerWrapper}>
        <button className={styles.dropdownBtn} onClick={handleDropdown}>
          <div className={styles.titleWrapper}>
            <div
              className={`${styles.dropdownIcon} ${
                isDropdown ? styles.showDropdownIcon : ""
              }`}
            >
              <DropdownIcon />
            </div>
            <div className={styles.dropdownTitle}>{title}</div>
          </div>
          {isCheck && (
            <div className={styles.check}>
              <CheckIcon />
            </div>
          )}
        </button>
        <div
          className={`${styles.dropdown} ${
            isDropdown ? styles.showDropdown : ""
          }`}
        >
          <div className={styles.dropdownContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DropdownInput;
