import { useState } from "react";
import styles from "./DropdownComponent.module.css";
import { colorCodes } from "../data";

import DropdownIcon from "./DropdownIcon";
import SelectComponent from "../components/filter/SelectComponent";

function DropdownComponent({ children, title, items, customWidth }) {
  const [isDropdown, setIsDropdown] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  function toggleDropdown() {
    setIsDropdown((drop) => !drop);
  }
  function toggleShowMore() {
    if (showMore) {
      setVisibleCount(5);
    } else {
      setVisibleCount(items?.length);
    }
    setShowMore(!showMore);
  }

  return (
    <div>
      <div className={styles.container}>
        <button
          aria-expanded={isDropdown}
          className={styles.dropdownButton}
          onClick={toggleDropdown}
        >
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.icon}>
            <DropdownIcon isDropdown={isDropdown} />
          </div>
        </button>

        {isDropdown && children && (
          <div className={styles.contents}>{children}</div>
        )}
        {isDropdown && items && children && (
          <div style={{ marginBottom: "20px" }}></div>
        )}
        {isDropdown && items && (
          <div className={styles.contents}>
            {items?.slice(0, visibleCount).map((item, i) => (
              <SelectComponent
                key={i}
                item={item}
                type="rarity"
                customWidth={customWidth}
                color={colorCodes[i]}
              />
            ))}
          </div>
        )}
        {isDropdown && items?.length > 6 && (
          <button className={styles.showMore} onClick={toggleShowMore}>
            {showMore ? "Hide" : "Show more"}
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default DropdownComponent;
