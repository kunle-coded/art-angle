import { forwardRef } from "react";
import { useSelector } from "react-redux";
import styles from "./SortComponent.module.css";
import { getGlobal } from "../reducers/globalSlice";

const sortArray = [
  "Recommended",
  "Recently Updated",
  "Recently Added",
  "Artwork Year (Descending)",
  "Artwork Year (Ascending)",
];

function SortComponent(props, ref) {
  const { sortPosition, showSortDropdown, sortDropdownPadding } =
    useSelector(getGlobal);

  const transformXY = `translate(${sortPosition.left}px, ${sortPosition.top}px)`;

  const handleSort = props.handleSort;
  const selected = props.selected;

  return (
    <div
      aria-label="Press escape to close"
      ref={ref}
      style={{
        transform: transformXY,
        paddingTop: !sortDropdownPadding ? "20px" : undefined,
        paddingBottom: sortDropdownPadding ? "20px" : undefined,
        display: "block",
      }}
      className={styles.popup}
    >
      <div
        className={`${styles.sortOptions} ${
          showSortDropdown ? styles.showDropdown : ""
        }`}
      >
        <div className={styles.focusGuard}></div>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
            {sortArray.map((item, i) => (
              <label
                key={i}
                role="radio"
                aria-checked
                className={`${styles.dropdownLabel} ${
                  selected === i ? styles.activeLabel : ""
                }`}
                onClick={() => handleSort(i, item)}
              >
                <div className={styles.checkBox}>
                  <div
                    className={`${styles.check} ${
                      selected === i ? styles.checked : ""
                    }`}
                  ></div>
                </div>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>{item}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className={styles.focusGuard}></div>
      </div>
    </div>
  );
}

export default forwardRef(SortComponent);
