import { useRef, useState } from "react";
import styles from "./SortComponent.module.css";

function SortComponent() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPop, setIsPop] = useState(false);

  const popupRef = useRef(null);

  const transformXY = `translate(${position.posX}px, ${position.posY - 400}px)`;

  function handleSort(e) {
    const labelRect = e.target.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const spaceAbove = labelRect.top;
    const spaceBelow = viewportHeight - labelRect.bottom;

    const posObj = { top: 0, left: 0 };
    if (spaceBelow > popupRect.height || spaceBelow > spaceAbove) {
      posObj.top = labelRect.bottom;
      posObj.left = labelRect.left;
    } else {
      posObj.top = labelRect.top - popupRect.height;
      posObj.left = labelRect.left;
    }

    setPosition(posObj);
    setIsPop((prevState) => !prevState);
    console.log(labelRect);
    console.log(labelRect.top, viewportHeight, labelRect.bottom);
    console.log(spaceBelow, popupRect.height, spaceAbove, posObj);
  }

  return (
    <div>
      <button
        aria-expanded="false"
        aria-haspopup
        className={styles.sortButton}
        onClick={handleSort}
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
        ref={popupRef}
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        className={styles.popup}
      ></div>
    </div>
  );
}

export default SortComponent;
