import { useEffect, useState } from "react";
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
import { useDeleteUrlParams, useUpdateUrlParams, useUrlParams } from "../hooks";

function DropdownComponent({ children, title, items, customWidth, isOpen }) {
  const [isDropdown, setIsDropdown] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isSelectChecked, setIsSelectChecked] = useState(false);
  const [checkedItem, setCheckedItem] = useState("");

  // const dispatch = useDispatch();

  const { selectedMedium, selectedRarity } = useSelector(getFilters);

  const removeUrlParams = useDeleteUrlParams();
  const updateUrlParams = useUpdateUrlParams();

  useEffect(() => {
    if (title === "Medium" && isOpen) {
      const isItemSelected = selectedMedium.some(
        (medium) => medium.value === checkedItem
      );

      const urlUpdate = () => {
        const mediumParam = {
          medium: selectedMedium.map((medium) => medium.value).join("+"),
        };
        updateUrlParams(mediumParam);
      };

      const removeParam = () => {
        removeUrlParams("medium", checkedItem);
      };

      if (isItemSelected) {
        urlUpdate();
      } else {
        removeParam();
      }
    }
  }, [checkedItem, isOpen, selectedMedium, title]);

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
            {items.map(
              (item, i) =>
                i <= visibleCount && (
                  <SelectComponent
                    key={i}
                    item={item}
                    type={title.toLowerCase()}
                    customWidth={customWidth}
                    color={colorCodes[i]}
                    isAllFilters={isDropdown}
                    onCheck={setIsSelectChecked}
                    onCheckedItem={setCheckedItem}
                  />
                )
            )}
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
