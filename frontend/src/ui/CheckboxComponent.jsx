import { useEffect, useState } from "react";
import styles from "./CheckboxComponent.module.css";

function CheckboxComponent({ isChecked, onCheck }) {
  // const [isChecked, setIsChecked] = useState(false);

  function handleCheck(e) {
    // setIsChecked((prevState) => !prevState);
    // onCheck?.();
  }

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      className={styles.item}
      onClick={onCheck}
    >
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
        <div className={styles.checkboxInner}>
          <svg
            viewBox="0 0 18 18"
            fill="currentColor"
            style={{
              position: "absolute",
              inset: "0px",
              width: "100%",
              height: "100%",
            }}
          >
            <path d="M6.93608 12.206L14.5761 4.576L15.4241 5.425L6.93208 13.905L2.68408 9.623L3.53608 8.777L6.93608 12.206Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CheckboxComponent;
