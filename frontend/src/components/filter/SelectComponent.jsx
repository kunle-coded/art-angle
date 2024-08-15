import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  updateMedium,
  removeMediumItem,
  updateRarity,
  removeRarityItem,
  updateAllFilters,
  removeAllFiltersItem,
} from "../../slices/filterSlice";

import styles from "./SelectComponent.module.css";

function SelectComponent({ item, type, customWidth, color }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isBlackWhite, setIsBlackWhite] = useState(false);

  const { selectedMedium, selectedRarity } = useSelector(getFilters);

  const dispatch = useDispatch();

  useEffect(() => {
    if (color) {
      if (item.includes("Black and White")) {
        setIsBlackWhite(true);
      } else {
        setIsBlackWhite(false);
      }
    }
  }, [color, item]);

  useEffect(() => {
    if (type === "medium") {
      if (selectedMedium.length >= 1) {
        selectedMedium.forEach((medium) => {
          if (medium.value === item) {
            setIsChecked(true);
          }
        });
      }
    }

    if (type === "rarity") {
      if (selectedRarity.value !== null) {
        if (selectedRarity.value === item) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      }
    }
  }, [dispatch, item, selectedMedium, selectedRarity, type]);

  function handleCheckbox(e) {
    e.stopPropagation();

    if (type === "medium") {
      if (isChecked) {
        dispatch(removeMediumItem(item));
        setIsChecked(false);
      } else {
        dispatch(updateMedium(item));
        setIsChecked(true);
      }
    } else if (type === "rarity") {
      if (isChecked) {
        dispatch(removeRarityItem(item));
        setIsChecked(false);
      } else {
        dispatch(updateRarity(item));
        setIsChecked(true);
      }
    } else {
      if (isChecked) {
        dispatch(removeAllFiltersItem(item));
        setIsChecked(false);
      } else {
        dispatch(updateAllFilters(item));
        setIsChecked(true);
      }
    }
  }

  return (
    <div
      role="checkbox"
      aria-checked="false"
      className={`${styles.item} ${isChecked ? styles.activeItem : ""}`}
      onClick={handleCheckbox}
    >
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
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
      <div
        className={`${styles.labelContainer} ${
          isChecked ? styles.activeLabel : ""
        }`}
      >
        <div className={`${customWidth ? styles.label65 : ""}`}>
          {item}
          {customWidth && (
            <div
              className={`${styles.colorFilter} ${
                isBlackWhite ? styles.blackNWhite : ""
              }`}
              style={!isBlackWhite ? { backgroundColor: color } : undefined}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectComponent;
