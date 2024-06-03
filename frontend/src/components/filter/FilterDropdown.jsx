import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getGlobal } from "../../reducers/globalSlice";
import useDropdown from "../../hooks/useDropdown";
import styles from "./FilterDropdown.module.css";

import Button from "../../ui/Button";
import { getFilters } from "../../reducers/filterSlice";

function FilterDropdown(props, ref) {
  const {
    sortPosition,
    mediumDropdown,
    rarityDropdown,
    sortDropdownPadding,
    isButtonDisabled,
  } = useSelector(getGlobal);

  const transformXY = `translate(${sortPosition.left}px, ${sortPosition.top}px)`;

  const filterRef = useRef(null);
  const labelRef = ref;

  const children = props.children;

  useEffect(() => {
    if (mediumDropdown || rarityDropdown) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mediumDropdown, rarityDropdown]);

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
          mediumDropdown || rarityDropdown ? styles.show : ""
        }`}
      >
        <div className={styles.focusGuard}></div>
        <div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <div className={styles.contents}>{children}</div>
            </div>
            <div className={styles.buttons}>
              <Button disable={isButtonDisabled} type="secondary" size="small">
                Clear
              </Button>
              <Button disable={isButtonDisabled} size="small">
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
