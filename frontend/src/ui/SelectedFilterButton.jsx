import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removeMediumItem,
  removeRarityItem,
  removePriceItem,
  removePriceFilter,
  removeAllFiltersItem,
  removeArtistItem,
  removeSizeItem,
  removeSizeFilter,
  removeWaysToBuyItem,
  removeLocationsItem,
  removeMaterialsItem,
  updateSizeFilter,
  removeTimePeriodsItem,
  removeColorsItem,
  removeGalleriesItem,
} from "../slices/filterSlice";

import styles from "./SelectedFilterButton.module.css";
import { useDeleteFilter, useDeleteUrlParams } from "../hooks";

function SelectedFilterButton({ text }) {
  const {
    selectedMedium,
    selectedRarity,
    selectedPrice,
    priceFilter,
    selectedArtists,
    selectedSize,
    sizeFilter,
    selectedWaysToBuy,
    selectedMaterials,
    selectedLocations,
    selectedTimePeriods,
    selectedColors,
    selectedGalleries,
  } = useSelector(getFilters);

  const dispatch = useDispatch();

  const removeUrlParams = useDeleteUrlParams();
  const deleteFilter = useDeleteFilter();

  function handleClose() {
    const isInRarity = selectedRarity.value === text;
    const isInSize = selectedSize.find((size) => size.value === text);
    const isInPrice = selectedPrice.find((price) => price.value === text);

    deleteFilter("single", text, selectedMedium, "medium", removeMediumItem);
    deleteFilter(
      "multiple",
      text,
      selectedWaysToBuy,
      "ways_to_buy",
      removeWaysToBuyItem
    );
    deleteFilter(
      "multiple",
      text,
      selectedMaterials,
      "materials",
      removeMaterialsItem
    );
    deleteFilter(
      "double",
      text,
      selectedLocations,
      "locations",
      removeLocationsItem
    );

    deleteFilter(
      "none",
      text,
      selectedTimePeriods,
      "periods",
      removeTimePeriodsItem
    );
    deleteFilter("multiple", text, selectedColors, "colors", removeColorsItem);
    deleteFilter(
      "multiple",
      text,
      selectedArtists,
      "artists",
      removeArtistItem
    );

    deleteFilter(
      "multiple",
      text,
      selectedGalleries,
      "galleries",
      removeGalleriesItem
    );

    if (isInRarity) {
      dispatch(removeRarityItem());
      const rarityVal = selectedRarity.value.toLowerCase().split(" ").join("-");
      removeUrlParams("rarity", rarityVal);
    }

    if (isInPrice) {
      const value = `${
        priceFilter.minPrice !== undefined ? priceFilter.minPrice : "%2B"
      }-${priceFilter.maxPrice !== undefined ? priceFilter.maxPrice : "%2B"}`;

      dispatch(removePriceItem());
      dispatch(removePriceFilter());
      removeUrlParams("price_range", value);
    }

    if (isInSize) {
      const isWidth = isInSize.value.includes("w:");
      const isHeight = isInSize.value.includes("h:");

      const newSizeFilter = { ...sizeFilter };
      if (isWidth) {
        newSizeFilter.minWidth = "";
        newSizeFilter.maxWidth = "";
        dispatch(removeSizeItem(text));
        removeUrlParams("width");
        dispatch(updateSizeFilter(newSizeFilter));
      } else if (isHeight) {
        newSizeFilter.minHeight = "";
        newSizeFilter.maxHeight = "";
        dispatch(removeSizeItem(text));
        removeUrlParams("height");
        dispatch(updateSizeFilter(newSizeFilter));
      } else {
        dispatch(removeSizeItem(text));
        dispatch(removeSizeFilter());
        removeUrlParams("size");
      }
    }
  }

  return (
    <button className={styles.buttonWrapper}>
      <div className={styles.buttonText}>
        <span>{text}</span>
      </div>
      <div className={styles.close} onClick={handleClose}>
        <svg
          viewBox="0 0 18 18"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.88006 9.00001L14.4401 13.56L13.5601 14.44L9.00006 9.88001L4.44006 14.44L3.56006 13.56L8.12006 9.00001L3.56006 4.44001L4.44006 3.56001L9.00006 8.12001L13.5601 3.56001L14.4401 4.44001L9.88006 9.00001Z"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export default SelectedFilterButton;
