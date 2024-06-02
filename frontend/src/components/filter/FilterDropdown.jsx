import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getGlobal } from "../../reducers/globalSlice";
import styles from "./FilterDropdown.module.css";
import useDropdown from "../../hooks/useDropdown";

import Button from "../../ui/Button";

const filterArray = [
  "Recommended",
  "Updated",
  "Recently",
  "Artwork",
  "Artwork Year",
];

function FilterDropdown(props, ref) {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    new Array(filterArray.length).fill(false)
  );

  const { sortPosition, filterDropdown, sortDropdownPadding } =
    useSelector(getGlobal);

  const transformXY = `translate(${sortPosition.left}px, ${sortPosition.top}px)`;

  const filterRef = useRef(null);
  const labelRef = ref;

  const selected = props.selected;
  const handleDropdown = props.handleDropdown;
  const children = props.children;

  useEffect(() => {
    if (filterDropdown) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [filterDropdown]);

  useDropdown(labelRef, filterRef);

  return (
    <div
      ref={filterRef}
      aria-label="Press escape to close"
      style={{
        transform: transformXY,
        paddingTop: !sortDropdownPadding ? "20px" : undefined,
        paddingBottom: sortDropdownPadding ? "20px" : undefined,
        display: "block",
      }}
      className={styles.dropdownContainer}
    >
      <div
        className={`${styles.dropdownWrapper} ${
          filterDropdown ? styles.show : ""
        }`}
      >
        <div className={styles.focusGuard}></div>
        <div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <div className={styles.contents}>{children}</div>
            </div>
            <div className={styles.buttons}>
              <Button type="secondary" size="small">
                Clear
              </Button>
              <Button disable={true} size="small">
                Confirm
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.focusGuard}></div>
      </div>
    </div>
  );
}

export default forwardRef(FilterDropdown);
