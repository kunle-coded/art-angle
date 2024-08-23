import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  updateCurrentSort,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
  showPriceDropdown,
} from "../slices/globalSlice";
import {
  clearMedium,
  getFilters,
  removePriceFilter,
  removeRarityItem,
  updateMedium,
  updatePrice,
  updatePriceFilter,
  updateRarity,
} from "../slices/filterSlice";
import { categories, rarity, medium } from "../data";

import Section from "../components/sections/Section";
import CategoryCardSmall from "../ui/CategoryCardSmall";
import PageHeader from "../ui/PageHeader";
import PosterBlock from "../ui/PosterBlock";
import FilterSort from "../ui/FilterSort";
import SortComponent from "../components/sort/SortComponent";
import SortButton from "../components/sort/SortButton";
import FilterComponent from "../components/filter/FilterComponent";
import FilterButton from "../components/filter/FilterButton";
import FilterDropdown from "../components/filter/FilterDropdown";
import SelectComponent from "../components/filter/SelectComponent";
import PriceSlider from "../components/filter/PriceSlider";
import AllFilters from "../components/filter/AllFilters";
import FilterModal from "../components/modal/FilterModal";
import Spacer from "../ui/Spacer";
import SectionInfo from "../ui/SectionInfo";
import ArtworkPoster from "../ui/ArtworkPoster";
import ArtworkGrid from "../ui/ArtworkGrid";
import ArtworkGridColumn from "../ui/ArtworkGridColumn";
import Pagination from "../components/pagination/Pagination";
import NewsLetter from "../components/cta/NewsLetter";
import { useAllArtworksQuery } from "../slices/artworksApiSlice";
import Spinner from "../ui/Spinner";
import distributeArtworks from "../helpers/distributeArtworks";
import { NUM_COLUMNS } from "../constants/constants";
import { useUrlParams, useUpdateUrlParams } from "../hooks";
import filterPrice from "../helpers/filterPrice";
import { getSearch } from "../slices/searchSlice";

const sortArray = [
  "Recommended",
  "Recently Updated",
  "Recently Added",
  "Artwork Year (Descending)",
  "Artwork Year (Ascending)",
];

function Artworks() {
  const [selected, setSelected] = useState(0);
  const [allSelectedFiltersCount, setAllSelectedFiltersCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [priceValues, setPriceValues] = useState({});

  const labelRef = useRef(null);
  const rarityRef = useRef(null);
  const mediumRef = useRef(null);
  const priceRef = useRef(null);

  const { data: artworks } = useAllArtworksQuery();

  const getUrlParams = useUrlParams();

  const { sortDropdown, mediumDropdown, rarityDropdown, priceDropdown } =
    useSelector(getGlobal);
  const {
    selectedMedium,
    selectedRarity,
    selectedPrice,
    selectedArtists,
    selectedSize,
    selectedWaysToBuy,
    selectedMaterials,
    selectedLocations,
    selectedTimePeriods,
    selectedColors,
    selectedGalleries,
  } = useSelector(getFilters);

  const { searchedKeyword } = useSelector(getSearch);

  const updateUrlParams = useUpdateUrlParams();

  const selectedFilter = [
    ...selectedMedium,
    selectedRarity,
    ...selectedPrice,
    ...selectedArtists,
    ...selectedSize,
    ...selectedWaysToBuy,
    ...selectedMaterials,
    ...selectedLocations,
    ...selectedTimePeriods,
    ...selectedColors,
    ...selectedGalleries,
    searchedKeyword,
  ].sort((a, b) => a.timestamp - b.timestamp);

  const allSelectedFilters = useMemo(
    () => [
      ...selectedArtists,
      ...selectedSize,
      ...selectedWaysToBuy,
      ...selectedMaterials,
      ...selectedLocations,
      ...selectedTimePeriods,
      ...selectedColors,
      ...selectedGalleries,
    ],
    [
      selectedArtists,
      selectedLocations,
      selectedMaterials,
      selectedSize,
      selectedWaysToBuy,
      selectedTimePeriods,
      selectedColors,
      selectedGalleries,
    ]
  );

  const dispatch = useDispatch();

  const priceParams = getUrlParams("price_range");
  const mediumParams = getUrlParams("medium");
  const rarityParams = getUrlParams("rarity");

  useEffect(() => {
    if (priceParams) {
      const { minPrice, maxPrice } = priceParams;
      if (minPrice || maxPrice) {
        dispatch(updatePriceFilter({ minPrice, maxPrice }));
        const priceInput = filterPrice(minPrice, maxPrice);
        dispatch(updatePrice(priceInput));
      }
    }
  }, []);

  useEffect(() => {
    if (mediumParams) {
      const medArr = mediumParams.split("+");

      medArr.forEach((item) => {
        dispatch(updateMedium(item));
      });
    }
  }, []);

  useEffect(() => {
    if (rarityParams) {
      const rarityValue = rarityParams.split("-").join(" ");

      dispatch(updateRarity(rarityValue));
    }
  }, []);

  // useEffect(() => {
  //   if (priceParams) {
  //     const { minPrice, maxPrice } = priceParams;
  //     if (minPrice || maxPrice) {
  //       const priceInput = filterPrice(minPrice, maxPrice);
  //       dispatch(updatePrice(priceInput));
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const selectedCount = allSelectedFilters.filter(
      (selected) => selected.value
    );
    setAllSelectedFiltersCount(selectedCount.length);
  }, [allSelectedFilters]);

  useEffect(() => {
    dispatch(updateCurrentSort(sortArray[0]));
  });

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));
  }

  function confirmPriceFilter() {
    dispatch(updatePriceFilter(priceValues));
    const priceInput = filterPrice(priceValues.minPrice, priceValues.maxPrice);
    dispatch(updatePrice(priceInput));

    const priceRange = {
      price_range: `${priceValues.minPrice ? priceValues.minPrice : "+"}-${
        priceValues.maxPrice ? priceValues.maxPrice : "+"
      }`,
    };
    updateUrlParams(priceRange);
  }

  function handleConfirmMediumFilter() {
    if (selectedMedium.length >= 1) {
      const mediumParam = {
        medium: selectedMedium
          .map((medium) => medium.value.toLowerCase())
          .join("+"),
      };
      updateUrlParams(mediumParam);
    } else {
      return;
    }
  }

  function handleConfirmRarityFilter() {
    if (selectedRarity.value) {
      const rarityVal = selectedRarity.value.toLowerCase().split(" ").join("-");
      const rarityParam = { rarity: rarityVal };
      updateUrlParams(rarityParam);
    } else {
      return;
    }
  }

  function handleClearFilter(type) {
    if (type === "rarity") {
      dispatch(removeRarityItem());
    }
    if (type === "medium") {
      dispatch(clearMedium());
    }

    if (type === "price") {
      dispatch(removePriceFilter());
    }
  }

  function openDropdown(target) {
    if (target === "sort") {
      dispatch(showSortDropdown());
    } else if (target === "medium") {
      dispatch(showMediumDropdown());
    } else if (target === "rarity") {
      dispatch(showRarityDropdown());
      console.log(target, rarityDropdown);
    } else if (target === "price") {
      dispatch(showPriceDropdown());
    }
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const style1 = {
    flex: "1",
    minWidth: "0",
    marginRight: "20px",
  };
  const style2 = {
    flex: "1",
    minWidth: "0",
    marginRight: "0px",
  };

  if (!artworks) {
    return <Spinner />;
  }

  const columns = distributeArtworks(artworks, NUM_COLUMNS);

  return (
    <div className="page">
      <PageHeader
        title="Discover and collect art online"
        subtitle="Browse by Categories"
      />

      <Section type="basic">
        <Spacer small={true} />
        <PosterBlock>
          {categories.map(
            (category, i) =>
              i <= 5 && (
                <CategoryCardSmall category={category} key={category.id} />
              )
          )}
        </PosterBlock>
      </Section>

      <FilterSort filters={selectedFilter}>
        <FilterComponent>
          <FilterButton
            text="All Filters"
            type="filter"
            count={allSelectedFiltersCount}
            left={true}
            onClick={() => openModal()}
          />
          <FilterButton
            ref={rarityRef}
            text="Rarity"
            type="filter"
            isDropdown={rarityDropdown}
            count={selectedRarity.value ? 1 : null}
            onClick={() => openDropdown("rarity")}
          />
          <FilterButton
            ref={mediumRef}
            text="Medium"
            type="filter"
            isDropdown={mediumDropdown}
            count={selectedMedium.length}
            onClick={() => openDropdown("medium")}
          />
          <FilterButton
            ref={priceRef}
            text="Price Range"
            type="filter"
            isDropdown={priceDropdown}
            count={selectedPrice.length}
            onClick={() => openDropdown("price")}
          />
        </FilterComponent>
        <SortButton ref={labelRef} onClick={() => openDropdown("sort")} />
      </FilterSort>

      <Section type="basic">
        <SectionInfo info={`${artworks.length} Artworks:`} />
        <Spacer small={true} />
        <ArtworkGrid>
          {columns.map((column, colIndex) => (
            <ArtworkGridColumn
              key={colIndex}
              style={colIndex === NUM_COLUMNS - 1 ? style2 : style1}
            >
              {column.map((artwork) => (
                <ArtworkPoster key={artwork.id} poster={artwork} />
              ))}
            </ArtworkGridColumn>
          ))}
        </ArtworkGrid>
      </Section>

      <Pagination />

      {/* <Spacer /> */}

      <NewsLetter />

      <div>
        {sortDropdown && (
          <SortComponent
            ref={labelRef}
            items={sortArray}
            selected={selected}
            handleSort={handleSort}
          />
        )}
      </div>
      <div>
        {mediumDropdown && (
          <FilterDropdown
            ref={mediumRef}
            type="medium"
            onConfirm={handleConfirmMediumFilter}
            onClear={handleClearFilter}
          >
            {medium.map((item, i) => (
              <SelectComponent key={i} item={item} type="medium" />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {rarityDropdown && (
          <FilterDropdown
            ref={rarityRef}
            type="rarity"
            onConfirm={handleConfirmRarityFilter}
            onClear={handleClearFilter}
          >
            {rarity.map((item, i) => (
              <SelectComponent key={i} item={item} type="rarity" />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {priceDropdown && (
          <FilterDropdown
            ref={priceRef}
            type="price"
            onConfirm={confirmPriceFilter}
            onClear={handleClearFilter}
          >
            <PriceSlider onPriceChange={setPriceValues} />
          </FilterDropdown>
        )}
      </div>

      <div>
        <FilterModal isShowModal={showModal} onCloseModal={closeModal}>
          <AllFilters onCloseModal={closeModal} isShowModal={showModal} />
        </FilterModal>
      </div>
    </div>
  );
}

export default Artworks;
