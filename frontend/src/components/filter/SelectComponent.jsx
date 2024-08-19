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
  removeArtistItem,
  updateArtistsFilter,
  removeSizeFilter,
  updateSizeFilter,
} from "../../slices/filterSlice";

import styles from "./SelectComponent.module.css";

function SelectComponent({
  item,
  type,
  artworkSizes,
  customWidth,
  color,
  isAllFilters = false,
  disableSelect = false,
  onCheckedItem,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isBlackWhite, setIsBlackWhite] = useState(false);

  const { selectedMedium, selectedRarity, selectedArtists, sizeFilter } =
    useSelector(getFilters);

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
    if (type === "rarity") {
      if (selectedRarity.value !== null) {
        if (selectedRarity.value === item) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      }
    }
  }, [item, selectedRarity, type]);

  useEffect(() => {
    if (type === "medium") {
      const isItemSelected = selectedMedium.some(
        (medium) => medium.value === item
      );
      setIsChecked(isItemSelected);
    }
  }, [item, selectedMedium, type]);

  useEffect(() => {
    if (type === "artists") {
      const isItemSelected = selectedArtists.some(
        (artist) => artist.value === item
      );
      setIsChecked(isItemSelected);
    }
  }, [item, selectedArtists, type]);

  useEffect(() => {
    if (isAllFilters) {
      if (isChecked) {
        onCheckedItem(item);
      } else {
        onCheckedItem(item);
      }
    }
  }, [isAllFilters, isChecked, item]);

  useEffect(() => {
    if (type === "size" && sizeFilter) {
      if (sizeFilter.value !== null || sizeFilter.minSize) {
        const isMedium = item.includes("Medium");

        if (isMedium) {
          const minSize = Number(artworkSizes?.value?.split("-")[0]);

          if (sizeFilter.minSize === minSize) {
            setIsChecked(true);
          } else {
            setIsChecked(false);
          }
        } else {
          if (sizeFilter.value === artworkSizes.value) {
            setIsChecked(true);
          } else {
            setIsChecked(false);
          }
        }
      }
    }
  }, [artworkSizes, disableSelect, item, sizeFilter, type]);

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
    } else if (type === "artists") {
      if (isChecked) {
        dispatch(removeArtistItem(item));
        setIsChecked(false);
      } else {
        dispatch(updateArtistsFilter(item));
        setIsChecked(true);
      }
    } else if (type === "size") {
      if (disableSelect) {
        setIsChecked(false);
        return;
      }

      if (isChecked) {
        dispatch(removeSizeFilter());
        setIsChecked(false);
      } else {
        const isMedium = item.includes("Medium");

        if (isMedium) {
          const minSize = Number(artworkSizes.value.split("-")[0]);
          const maxSize = Number(artworkSizes.value.split("-")[1]);
          const unit = artworkSizes.unit;

          const sizeObj = { minSize, maxSize, unit };

          dispatch(updateSizeFilter(sizeObj));
        } else {
          dispatch(updateSizeFilter(artworkSizes));
        }
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
      aria-checked={isChecked}
      className={`${styles.item} ${isChecked ? styles.activeItem : ""} ${
        disableSelect ? styles.disabled : ""
      }`}
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
