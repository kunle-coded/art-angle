import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removeMediumItem,
  removeRarityItem,
  removePriceItem,
  removePriceFilter,
} from "../slices/filterSlice";

import styles from "./SelectedFilterButton.module.css";
import { useDeleteUrlParams } from "../hooks";

function SelectedFilterButton({ text }) {
  const { selectedMedium, selectedRarity, selectedPrice, priceFilter } =
    useSelector(getFilters);

  const dispatch = useDispatch();

  const removeUrlParams = useDeleteUrlParams();

  function handleClose() {
    const isInMedium = selectedMedium.find((medium) => medium.value === text);
    const isInRarity = selectedRarity.find((rarity) => rarity.value === text);
    const isInPrice = selectedPrice.find((price) => price.value === text);

    if (isInMedium) {
      dispatch(removeMediumItem(text));
      removeUrlParams("medium", isInMedium.value);
    } else if (isInRarity) {
      dispatch(removeRarityItem(text));
    } else if (isInPrice) {
      dispatch(removePriceItem());
      dispatch(removePriceFilter());

      const value = `${
        priceFilter.minPrice !== undefined ? priceFilter.minPrice : "%2B"
      }-${priceFilter.maxPrice !== undefined ? priceFilter.maxPrice : "%2B"}`;
      console.log("is in price ", isInPrice, value);
      removeUrlParams("price_range", value);
    } else {
      return;
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
