import { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./SortComponent.module.css";
import { getGlobal } from "../../reducers/globalSlice";
import useDropdown from "../../hooks/useDropdown";
import Checkbox from "../../ui/Checkbox";

function SortComponent(props, ref) {
  const { sortPosition, sortDropdown, sortDropdownPadding } =
    useSelector(getGlobal);

  const transformXY = `translate(${sortPosition.left}px, ${sortPosition.top}px)`;

  const sortRef = useRef(null);
  const labelRef = ref;

  const sortItems = props.items;
  const selected = props.selected;
  const handleSort = props.handleSort;

  useEffect(() => {
    if (sortDropdown) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sortDropdown]);

  useDropdown(labelRef, sortRef, "sort");

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
          sortDropdown ? styles.showDropdown : ""
        }`}
      >
        <div className={styles.focusGuard}></div>
        <div>
          <div className={styles.dropdown}>
            {sortItems.map((item, i) => (
              <Checkbox
                key={i}
                selected={selected}
                index={i}
                label={item}
                onCheck={handleSort}
              />
            ))}
          </div>
        </div>
        <div className={styles.focusGuard}></div>
      </div>
    </div>
  );
}

export default forwardRef(SortComponent);
