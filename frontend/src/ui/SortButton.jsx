import { useSelector } from "react-redux";
import styles from "./SortButton.module.css";
import { getGlobal } from "../reducers/globalSlice";
import { forwardRef } from "react";

function SortButton(props, ref) {
  const { currentSort } = useSelector(getGlobal);

  const handleShowSort = props.handleShowSort;

  return (
    <div>
      <button
        ref={ref}
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
        <div className={styles.text}>Sort: {currentSort}</div>
      </button>
    </div>
  );
}

export default forwardRef(SortButton);
