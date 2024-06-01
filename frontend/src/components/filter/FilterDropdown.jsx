import { forwardRef, useEffect, useRef, useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);

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

  function handleCheckbox() {
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div
      aria-label="Press escape to close"
      ref={sortRef}
      style={{
        transform: transformXY,
        paddingTop: !sortDropdownPadding ? "20px" : undefined,
        paddingBottom: sortDropdownPadding ? "20px" : undefined,
      }}
      className={styles.dropdownContainer}
    >
      <div
        className={`${styles.dropdownWrapper} ${
          showSortDropdown ? styles.showDropdown : ""
        }`}
      >
        <div className={styles.focusGuard}></div>
        <div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <div className={styles.contents}>
                <div
                  role="checkbox"
                  aria-checked="false"
                  className={`${styles.item} ${
                    isChecked ? styles.activeItem : ""
                  }`}
                  onClick={handleCheckbox}
                >
                  <div
                    className={`${styles.checkbox} ${
                      isChecked ? styles.checked : ""
                    }`}
                  >
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
                    <div>Painting</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.buttons}></div>
          </div>
        </div>
        <div className={styles.focusGuard}></div>
      </div>
    </div>
  );
}

export default forwardRef(FilterDropdown);
