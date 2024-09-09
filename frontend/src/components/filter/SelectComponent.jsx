import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  updateMedium,
  removeMediumItem,
  updateRarity,
  removeRarityItem,
  removeArtistItem,
  updateArtistsFilter,
  removeSizeFilter,
  updateSizeFilter,
  removeWaysToBuyItem,
  updateWaysToBuy,
  removeMaterialsItem,
  updateMaterials,
  removeLocationsItem,
  updateLocations,
  removeTimePeriodsItem,
  updateTimePeriods,
  removeColorsItem,
  updateColors,
  updateGalleries,
  removeGalleriesItem,
} from "../../slices/filterSlice";
import selectedItemsChecker from "../../helpers/selectedItemsChecker";

import styles from "./SelectComponent.module.css";
import { useSelectionUpdate } from "../../hooks";

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

  const {
    selectedMedium,
    selectedRarity,
    selectedArtists,
    sizeFilter,
    selectedSize,
    selectedWaysToBuy,
    selectedMaterials,
    selectedLocations,
    selectedTimePeriods,
    selectedColors,
    selectedGalleries,
  } = useSelector(getFilters);

  const dispatch = useDispatch();

  const updateSelection = useSelectionUpdate();

  useEffect(() => {
    if (color) {
      if (item.includes("Black and White")) {
        setIsBlackWhite(true);
      } else {
        setIsBlackWhite(false);
      }
    }
  }, [color, item]);

  // Check object if it contains selected item and set checkbox to checked
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

  // Check list if an item is already selected and set checkbox to checked
  useEffect(() => {
    if (type === "medium") {
      const isItemSelected = selectedItemsChecker(item, selectedMedium);
      setIsChecked(isItemSelected);
    }

    if (type === "artists") {
      const isItemSelected = selectedItemsChecker(item, selectedArtists);
      setIsChecked(isItemSelected);
    }

    if (type === "ways to buy") {
      const isItemSelected = selectedItemsChecker(item, selectedWaysToBuy);
      setIsChecked(isItemSelected);
    }

    if (type === "materials") {
      const isItemSelected = selectedItemsChecker(item, selectedMaterials);
      setIsChecked(isItemSelected);
    }

    if (type === "artwork location") {
      const isItemSelected = selectedItemsChecker(item, selectedLocations);
      setIsChecked(isItemSelected);
    }

    if (type === "time periods") {
      const isItemSelected = selectedItemsChecker(item, selectedTimePeriods);
      setIsChecked(isItemSelected);
    }
    if (type === "color") {
      const isItemSelected = selectedItemsChecker(item, selectedColors);
      setIsChecked(isItemSelected);
    }
    if (type === "galleries and institutions") {
      const isItemSelected = selectedItemsChecker(item, selectedGalleries);
      setIsChecked(isItemSelected);
    }
  }, [
    item,
    type,
    selectedMedium,
    selectedArtists,
    selectedWaysToBuy,
    selectedMaterials,
    selectedLocations,
    selectedTimePeriods,
    selectedColors,
    selectedGalleries,
  ]);

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
    if (type === "size") {
      if (sizeFilter.value || sizeFilter.minSize) {
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
      } else {
        setIsChecked(false);
      }
    }
  }, [artworkSizes, disableSelect, item, sizeFilter, type]);

  // Function to select and deselect checkbox, it also updates the filter state
  function handleCheckbox(e) {
    e.stopPropagation();

    if (type === "medium") {
      const isSelected = updateSelection(updateMedium, removeMediumItem, item);
      setIsChecked(isSelected);
    } else if (type === "rarity") {
      const isSelected = updateSelection(updateRarity, removeRarityItem, item);
      setIsChecked(isSelected);
    } else if (type === "artists") {
      const isSelected = updateSelection(
        updateArtistsFilter,
        removeArtistItem,
        item
      );
      setIsChecked(isSelected);
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
          const sizes = artworkSizes.value.split("-");
          const minSize = Number(sizes[0]);
          const maxSize = Number(sizes[1]);
          const unit = artworkSizes.unit;

          const sizeObj = { minSize, maxSize, unit };
          dispatch(updateSizeFilter(sizeObj));
        } else {
          dispatch(updateSizeFilter(artworkSizes));
        }
        setIsChecked(true);
      }
    } else if (type === "ways to buy") {
      const isSelected = updateSelection(
        updateWaysToBuy,
        removeWaysToBuyItem,
        item
      );
      setIsChecked(isSelected);
    } else if (type === "materials") {
      const isSelected = updateSelection(
        updateMaterials,
        removeMaterialsItem,
        item
      );
      setIsChecked(isSelected);
    } else if (type === "artwork location") {
      const isSelected = updateSelection(
        updateLocations,
        removeLocationsItem,
        item
      );
      setIsChecked(isSelected);
    } else if (type === "time periods") {
      const isSelected = updateSelection(
        updateTimePeriods,
        removeTimePeriodsItem,
        item
      );
      setIsChecked(isSelected);
    } else if (type === "color") {
      const isSelected = updateSelection(updateColors, removeColorsItem, item);
      setIsChecked(isSelected);
    } else if (type === "galleries and institutions") {
      const isSelected = updateSelection(
        updateGalleries,
        removeGalleriesItem,
        item
      );
      setIsChecked(isSelected);
    } else {
      if (isChecked) {
        // dispatch(removeAllFiltersItem(item));
        setIsChecked(false);
      } else {
        // dispatch(updateAllFilters(item));
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
