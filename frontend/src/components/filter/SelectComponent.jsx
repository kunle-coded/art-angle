import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, updateMedium } from "../../reducers/filterSlice";

import styles from "./SelectComponent.module.css";

function SelectComponent({ selectItems, item }) {
  const [isChecked, setIsChecked] = useState(false);

  const { selectedMedium } = useSelector(getFilters);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMedium.length >= 1) {
      selectedMedium.forEach((medium) => {
        if (medium === item) {
          setIsChecked(true);
        }
      });
    }
  }, [item, selectedMedium]);

  function handleCheckbox(e) {
    e.stopPropagation();

    dispatch(updateMedium(item));
    setIsChecked((prevChecked) => !prevChecked);
  }

  return (
    <div
      role="checkbox"
      aria-checked="false"
      className={`${styles.item} ${isChecked ? styles.activeItem : ""}`}
      onClick={handleCheckbox}
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
      <div className={styles.labelContainer}>
        <div>{item}</div>
      </div>
    </div>
  );
}

export default SelectComponent;
