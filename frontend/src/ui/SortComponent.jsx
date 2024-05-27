import { useEffect, useRef, useState } from "react";
import styles from "./SortComponent.module.css";

const sortArray = [
  "Recommended",
  "Recently Updated",
  "Recently Added",
  "Artwork Year (Descending)",
  "Artwork Year (Ascending)",
];

function SortComponent() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPopupVisible, setisPopupVisible] = useState(false);
  const [padding, setPadding] = useState(false);
  const [selected, setSelected] = useState(0);

  const popupRef = useRef(null);

  const transformXY = `translate(${position.left}px, ${position.top}px)`;

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  function handleShowSort(e) {
    const labelRect = e.target.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const spaceAbove = labelRect.top;
    const spaceBelow = viewportHeight - labelRect.bottom;

    const posObj = { top: 0, left: 0 };
    if (spaceBelow > popupRect.height || spaceBelow > spaceAbove) {
      posObj.top = labelRect.bottom;
      posObj.left = labelRect.left;
      setPadding(false);
    } else {
      posObj.top = labelRect.top - popupRect.height;
      posObj.left = labelRect.left;
      setPadding(true);
    }

    setPosition(posObj);
    setisPopupVisible((prevState) => !prevState);
  }

  function handleSort(index) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
  }

  return (
    <div>
      <button
        aria-expanded="false"
        aria-haspopup
        className={styles.sortButton}
        onClick={handleShowSort}
      >
        <div className={styles.icon}>
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{
              position: "absolute",
              inset: "0px",
              width: "100%",
              height: "100%",
            }}
          >
            <path d="M2.76517 4.96465L5.66196 2.06787L8.55552 4.96465L7.97669 5.5236L6.06002 3.60694L6.06002 13.1319L5.26067 13.1319L5.26067 3.60694L3.34401 5.5236L2.76517 4.96465ZM7.44402 11.0384L8.02286 10.4794L9.93952 12.3961L9.93953 2.86787L10.7389 2.86787L10.7389 12.3961L12.6555 10.4794L13.2344 11.0384L10.3408 13.9319L7.44402 11.0384Z"></path>
          </svg>
        </div>
        <div className={styles.text}>Sort: Recommended</div>
      </button>
      <div
        aria-label="Press escape to close"
        ref={popupRef}
        style={{
          transform: transformXY,
          paddingTop: !padding ? "20px" : undefined,
          paddingBottom: padding ? "20px" : undefined,
          display: "block",
        }}
        className={styles.popup}
      >
        <div
          className={`${styles.sortOptions} ${
            isPopupVisible ? styles.showDropdown : ""
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
                  tabIndex={i}
                  className={`${styles.dropdownLabel} ${
                    selected === i ? styles.activeLabel : ""
                  }`}
                  onClick={() => handleSort(i)}
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
    </div>
  );
}

export default SortComponent;
