import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removeMediumItem,
  updateMedium,
} from "../slices/filterSlice";
import { colorCodes } from "../data";
import styles from "./DropdownComponent.module.css";

import DropdownIcon from "./DropdownIcon";
import SelectComponent from "../components/filter/SelectComponent";

function DropdownComponent({ children, title, items, customWidth }) {
  const [isDropdown, setIsDropdown] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

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

  function filterHandler(item) {
    const filterTitle = title.toLowerCase();

    if (filterTitle === "medium") {
      if (isChecked) {
        console.log("filter handler check >> ", filterTitle, item, isChecked);
        dispatch(updateMedium(item));
      } else {
        console.log("filter handler uncheck >> ", filterTitle, item, isChecked);
        dispatch(removeMediumItem(item));
      }
    }
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
                type={title.toLowerCase()}
                customWidth={customWidth}
                color={colorCodes[i]}
                isAllFilters
                onCheck={filterHandler}
                setCheck={setIsChecked}
              />
            ))}
          </div>
        )}
        {isDropdown && items?.length > 6 && (
          <button className={styles.showMore} onClick={toggleShowMore}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default DropdownComponent;
