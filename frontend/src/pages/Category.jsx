import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  updateCurrentSort,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
  showPriceDropdown,
  updateSuccessMgs,
  enableError,
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
import { categories, rarity, medium, artworksCategories } from "../data";

import Section from "../components/sections/Section";
import CategoryCardSmall from "../ui/CategoryCardSmall";
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
import {
  useAllArtworksQuery,
  useArtworksCategoriesQuery,
  useFiltertedArtworksQuery,
} from "../slices/artworksApiSlice";
import Spinner from "../ui/Spinner";
import distributeArtworks from "../helpers/distributeArtworks";
import { NUM_COLUMNS } from "../constants/constants";
import {
  useUrlParams,
  useUpdateUrlParams,
  useDeleteUrlParams,
  emptyObject,
} from "../hooks";
import filterPrice from "../helpers/filterPrice";
import { getSearch } from "../slices/searchSlice";
import { useParams } from "react-router-dom";
import CategoryHeader from "../ui/CategoryHeader";

const sortArray = [
  "Recommended",
  "Recently Added",
  "Price (Descending)",
  "Price (Ascending)",
  "Artwork Year (Descending)",
  "Artwork Year (Ascending)",
];

function Category() {
  const { name } = useParams();

  const {
    data: categoriesData,
    isSuccess,
    isError: isCategoriesError,
  } = useArtworksCategoriesQuery(name);
  const { data } = useAllArtworksQuery();

  const [artworks, setArtworks] = useState([]);
  const [selected, setSelected] = useState(0);
  const [allSelectedFiltersCount, setAllSelectedFiltersCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [skipFilter, setSkipFilter] = useState(true);
  const [priceValues, setPriceValues] = useState({});
  const [pageMeta, setPageMeta] = useState({});

  const labelRef = useRef(null);
  const rarityRef = useRef(null);
  const mediumRef = useRef(null);
  const priceRef = useRef(null);

  const columns = distributeArtworks(artworks, NUM_COLUMNS);

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
  const removeUrlParams = useDeleteUrlParams();

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
      searchedKeyword,
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
      searchedKeyword,
    ]
  );

  const dispatch = useDispatch();

  const priceParams = getUrlParams("price_range");
  const allParams = getUrlParams();

  const categoryParams = { ...allParams, category: name };

  const {
    data: filtered,
    error,
    isError,
    isSuccess: isFilterSuccess,
    isLoading: isFilterLoading,
  } = useFiltertedArtworksQuery(categoryParams, {
    skip: skipFilter,
  });

  useEffect(() => {
    if (isSuccess) {
      setArtworks(categoriesData);
    }
  }, [categoriesData, isSuccess]);

  useEffect(() => {
    const meta = artworksCategories.find((category) =>
      category.category.toLowerCase().includes(name)
    );

    setPageMeta(meta);
  }, [name]);

  useEffect(() => {
    if (isCategoriesError || categoriesData?.length < 1) {
      setArtworks(data);
    }
  }, [data, isCategoriesError, categoriesData]);

  useEffect(() => {
    const isAllParamsEmpty = emptyObject(allParams);

    if (isAllParamsEmpty) {
      setSkipFilter(true);
    } else {
      setSkipFilter(false);
    }
  }, [allParams]);

  useEffect(() => {
    if (isFilterSuccess && filtered) {
      if (filtered.length >= 1) {
        setArtworks(filtered);
      }
    } else {
      if (isError) {
        const errMsg = error?.data?.message;
        dispatch(updateSuccessMgs(errMsg));
        dispatch(enableError());
      }
    }
  }, [dispatch, isError, filtered, isFilterSuccess]);

  useEffect(() => {
    const isAllParamsEmpty = emptyObject(allParams);

    if (isFilterSuccess && isAllParamsEmpty) {
      setArtworks(categoriesData);
    }
  }, [allParams, isFilterSuccess, categoriesData]);

  // useEffect(() => {
  //   if (priceParams) {
  //     const { minPrice, maxPrice } = priceParams;
  //     if (minPrice || maxPrice) {
  //       dispatch(updatePriceFilter({ minPrice, maxPrice }));
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

  // Update sort item from url
  useEffect(() => {
    const sortParams = allParams.sort;
    if (sortParams) {
      if (sortParams === "published-at") {
        setSelected(1);
        dispatch(updateCurrentSort(sortArray[1]));
      } else if (sortParams === "price-descending") {
        setSelected(2);
        dispatch(updateCurrentSort(sortArray[2]));
      } else if (sortParams === "price-ascending") {
        setSelected(3);
        dispatch(updateCurrentSort(sortArray[3]));
      } else if (sortParams === "year-descending") {
        setSelected(4);
        dispatch(updateCurrentSort(sortArray[4]));
      } else if (sortParams === "year-ascending") {
        setSelected(5);
        dispatch(updateCurrentSort(sortArray[5]));
      } else {
        setSelected(0);
        dispatch(updateCurrentSort(sortArray[0]));
      }
    } else {
      dispatch(updateCurrentSort(sortArray[0]));
    }
  }, [allParams, dispatch]);

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));

    const sortParam = {};

    switch (index) {
      case 1:
        sortParam.sort = "published-at";
        break;
      case 2:
        sortParam.sort = "price-descending";
        break;
      case 3:
        sortParam.sort = "price-ascending";
        break;
      case 4:
        sortParam.sort = "year-descending";
        break;
      case 5:
        sortParam.sort = "year-ascending";
        break;

      default:
        sortParam.sort = null;
        break;
    }

    if (sortParam.sort) {
      updateUrlParams(sortParam);
    } else {
      removeUrlParams("sort");
    }
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

  return (
    <div className="page">
      <CategoryHeader categoryMeta={pageMeta} breadcumbLink={name} />

      <div style={{ marginTop: "100px" }}></div>

      {/* TODO: Modify based on which category, show on some. */}
      {/* <Section type="basic" title="Browse by Category">
        <Spacer small />
        <PosterBlock>
          {categories.map(
            (category, i) =>
              i <= 5 && (
                <CategoryCardSmall category={category} key={category.id} />
              )
          )}
        </PosterBlock>
      </Section> */}

      {/* TODO: To Add sticky prop later */}
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
        <SectionInfo
          info={`${artworks.length} ${
            artworks.length > 1 ? "Artworks" : "Artwork"
          }:`}
        />
        <Spacer small={true} />
        {isFilterLoading && <Spinner />}
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

      {artworks.length >= 50 && <Pagination />}

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

export default Category;
