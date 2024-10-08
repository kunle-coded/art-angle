import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removeMediumItem,
  updateMedium,
} from "../slices/filterSlice";
import { colorCodes, materials } from "../data";
import styles from "./DropdownComponent.module.css";

import DropdownIcon from "./DropdownIcon";
import SelectComponent from "../components/filter/SelectComponent";
import {
  useDeleteUrlParams,
  useUpdateUrlParams,
  useUrlParamsUpdate,
} from "../hooks";
import { getSearch } from "../slices/searchSlice";

function DropdownComponent({ children, title, items, customWidth, isOpen }) {
  const [isDropdown, setIsDropdown] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [checkedItem, setCheckedItem] = useState("");
  // const [selectedArtists, setSelectedArtists] = useState([]);

  // const dispatch = useDispatch();

  const {
    selectedMedium,
    selectedRarity,
    selectedArtists,
    selectedLocations,
    selectedWaysToBuy,
    selectedMaterials,
    selectedTimePeriods,
    selectedColors,
    selectedGalleries,
  } = useSelector(getFilters);
  const { searchedKeyword } = useSelector(getSearch);

  const paramsUpdater = useUrlParamsUpdate();

  useEffect(() => {
    if (isOpen) {
      if (title === "Medium") {
        paramsUpdater("medium", selectedMedium, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedMedium, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Artists") {
        paramsUpdater("artists", selectedArtists, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedArtists, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Rarity") {
        paramsUpdater("rarity", null, selectedRarity, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedRarity, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Ways to Buy") {
        paramsUpdater("ways_to_buy", selectedWaysToBuy, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedWaysToBuy, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Materials") {
        paramsUpdater("materials", selectedMaterials, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedMaterials, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Artwork Location") {
        paramsUpdater("locations", selectedLocations, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedLocations, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Time Periods") {
        paramsUpdater("periods", selectedTimePeriods, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedTimePeriods, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Color") {
        paramsUpdater("colors", selectedColors, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedColors, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Galleries and Institutions") {
        paramsUpdater("galleries", selectedGalleries, null, checkedItem);
      }
    }
  }, [checkedItem, isOpen, selectedGalleries, title]);

  useEffect(() => {
    if (isOpen) {
      if (title === "Keyword Search") {
        if (searchedKeyword.value) {
          paramsUpdater("keyword", null, searchedKeyword, null);
        }
      }
    }
  }, [isOpen, searchedKeyword, title]);

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

        {isDropdown &&
          items &&
          (items?.length >= 1 ? (
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
                      onCheckedItem={setCheckedItem}
                    />
                  )
              )}
            </div>
          ) : (
            <div className={styles.title}>No results.</div>
          ))}
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
