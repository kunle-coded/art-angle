import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removePriceFilter,
  updatePrice,
  updatePriceFilter,
} from "../../slices/filterSlice";
import {
  deleteKeyword,
  getSearch,
  updateKeyword,
} from "../../slices/searchSlice";
import { useDeleteUrlParams, useField, useUpdateUrlParams } from "../../hooks";

import DropdownComponent from "../../ui/DropdownComponent";
import Spacer from "../../ui/Spacer";
import styles from "./AllFilters.module.css";
import SearchField from "../../ui/SearchField";
import PriceSlider from "./PriceSlider";
import {
  artists,
  rarity,
  medium,
  materials,
  waysToBuy,
  timePeriod,
  colors,
  artGalleries,
  locations,
} from "../../data";
import SizeComponent from "../../ui/SizeComponent";
import searchList from "../../helpers/listSearcher";

function AllFilters({ onCloseModal, isShowModal }) {
  const [materialsList, setMaterialsList] = useState(materials);
  const [locationsList, setLocationsList] = useState(locations);
  const [galleriesList, setGalleriesList] = useState(artGalleries);
  const [isKeyword, setIsKeyword] = useState(false);

  const { searchedKeyword } = useSelector(getSearch);

  const updateUrlParams = useUpdateUrlParams();
  const removeUrlParams = useDeleteUrlParams();

  const dispatch = useDispatch();

  const keywordSearch = useField("text");
  const { onReset: resetKeywordSearch, ...keywordSearchProps } = keywordSearch;
  const materialsSearch = useField("text");
  const { onReset: resetMaterialsSearch, ...materialsSearchProps } =
    materialsSearch;
  const locationSearch = useField("text");
  const { onReset: resetLocationSearch, ...locationSearchProps } =
    locationSearch;
  const gallerySearch = useField("text");
  const { onReset: resetGallerySearch, ...gallerySearchProps } = gallerySearch;

  const artistsNames = artists.map((artist) => artist.name);

  useEffect(() => {
    if (keywordSearch.value.length >= 3) {
      const keyword = `Keyword: ${keywordSearch.value}`;
      dispatch(updateKeyword(keyword));
      setIsKeyword(true);
    }
  }, [keywordSearch.value]);

  useEffect(() => {
    if (!searchedKeyword.value && isKeyword) {
      resetKeywordSearch();
    }
  }, [searchedKeyword.value, isKeyword]);

  useEffect(() => {
    if (materialsSearch.value) {
      const searchResult = searchList(materials, materialsSearch.value);
      setMaterialsList(searchResult);
    } else {
      setMaterialsList(materials);
    }
  }, [materialsSearch.value]);

  useEffect(() => {
    if (locationSearch.value) {
      const searchResult = searchList(locations, locationSearch.value);
      setLocationsList(searchResult);
    } else {
      setLocationsList(locations);
    }
  }, [locationSearch.value]);

  useEffect(() => {
    if (gallerySearch.value) {
      const searchResult = searchList(artGalleries, gallerySearch.value);
      setGalleriesList(searchResult);
    } else {
      setGalleriesList(artGalleries);
    }
  }, [gallerySearch.value]);

  // const handlePriceAllFilter = useCallback(
  //   (price) => {
  //     if (price.minPrice || price.maxPrice) {
  //       dispatch(updatePriceFilter(price));

  //       const priceRange = {
  //         price_range: `${price.minPrice ? price.minPrice : "+"}-${
  //           price.maxPrice ? price.maxPrice : "+"
  //         }`,
  //       };

  //       updateUrlParams(priceRange);
  //     } else {
  //       removeUrlParams("price_range");
  //       dispatch(removePriceFilter());
  //     }
  //   },
  //   [dispatch]
  // );

  const handlePriceAllFilter = (price) => {
    if (price.minPrice || price.maxPrice) {
      dispatch(updatePriceFilter(price));

      const priceRange = {
        price_range: `${price.minPrice ? price.minPrice : "+"}-${
          price.maxPrice ? price.maxPrice : "+"
        }`,
      };

      updateUrlParams(priceRange);
    } else {
      removeUrlParams("price_range");
      dispatch(removePriceFilter());
    }
  };

  function handleClearKeywordInput(e) {
    resetKeywordSearch(e);
    if (keywordSearch.value.length >= 3) {
      dispatch(deleteKeyword());
      removeUrlParams("keyword");
      setIsKeyword(false);
    }
  }

  function handleClearMaterialInput(e) {
    resetMaterialsSearch(e);
    setMaterialsList(materials);
  }

  function handleClearLocationInput(e) {
    resetLocationSearch(e);
    setLocationsList(locations);
  }

  function handleClearGalleryInput(e) {
    resetGallerySearch(e);
    setGalleriesList(artGalleries);
  }

  return (
    <div className={styles.slideIn}>
      <div className={styles.modalHeader}>
        <div className={styles.modalTitle}>Filters</div>

        <button className={styles.modalClose} onClick={onCloseModal}>
          <div className={styles.icon}>
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
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.88006 9.00001L14.4401 13.56L13.5601 14.44L9.00006 9.88001L4.44006 14.44L3.56006 13.56L8.12006 9.00001L3.56006 4.44001L4.44006 3.56001L9.00006 8.12001L13.5601 3.56001L14.4401 4.44001L9.88006 9.00001Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <Spacer />
      <DropdownComponent title="Keyword Search" isOpen={isShowModal}>
        <SearchField
          placeholder="Enter a search term"
          isShowClear={keywordSearch.value.length >= 1}
          onClear={handleClearKeywordInput}
          {...keywordSearchProps}
        />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent
        items={artistsNames}
        title="Artists"
        isOpen={isShowModal}
      />
      <Spacer />
      <DropdownComponent items={rarity} title="Rarity" isOpen={isShowModal} />
      <Spacer />
      <DropdownComponent items={medium} title="Medium" isOpen={isShowModal} />
      <Spacer />
      <DropdownComponent title="Price">
        <PriceSlider onPriceChange={handlePriceAllFilter} />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent title="Size">
        <SizeComponent isOpen={isShowModal} />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent
        items={waysToBuy}
        title="Ways to Buy"
        isOpen={isShowModal}
      />
      <Spacer />
      <DropdownComponent
        items={materialsList}
        title="Materials"
        isOpen={isShowModal}
      >
        <SearchField
          placeholder="Enter a material"
          isShowClear={materialsSearch.value.length >= 1}
          onClear={handleClearMaterialInput}
          {...materialsSearchProps}
        />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent
        items={locationsList}
        title="Artwork Location"
        isOpen={isShowModal}
      >
        <SearchField
          placeholder="Enter a city"
          isShowClear={locationSearch.value.length >= 1}
          onClear={handleClearLocationInput}
          {...locationSearchProps}
        />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent
        items={timePeriod}
        title="Time Periods"
        isOpen={isShowModal}
      />
      <Spacer />
      <DropdownComponent
        items={colors}
        title="Color"
        customWidth={true}
        isOpen={isShowModal}
      />
      <Spacer />
      <DropdownComponent
        items={galleriesList}
        title="Galleries and Institutions"
        isOpen={isShowModal}
      >
        <SearchField
          placeholder="Enter a gallery"
          isShowClear={gallerySearch.value.length >= 1}
          onClear={handleClearGalleryInput}
          {...gallerySearchProps}
        />
      </DropdownComponent>
    </div>
  );
}

export default AllFilters;
