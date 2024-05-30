import { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./FilterDropdown.module.css";
import { getGlobal } from "../../reducers/globalSlice";
import useDropdown from "../../hooks/useDropdown";

const sortArray = [
  "Recommended",
  "Recently Updated",
  "Recently Added",
  "Artwork Year (Descending)",
  "Artwork Year (Ascending)",
];

function FilterDropdown(props, ref) {
  const { sortPosition, showSortDropdown, sortDropdownPadding } =
    useSelector(getGlobal);

  const transformXY = `translate(${sortPosition.left}px, ${sortPosition.top}px)`;

  const sortRef = useRef(null);
  const labelRef = ref;

  const selected = props.selected;
  const handleSort = props.handleSort;

  useEffect(() => {
    if (showSortDropdown) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSortDropdown]);

  useDropdown(labelRef, sortRef);

  return (
    <div
      aria-label="Press escape to close"
      ref={sortRef}
      style={{
        transform: transformXY,
        paddingTop: !sortDropdownPadding ? "20px" : undefined,
        paddingBottom: sortDropdownPadding ? "20px" : undefined,
        display: "block",
      }}
      className={styles.sort}
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

export default forwardRef(FilterDropdown);
