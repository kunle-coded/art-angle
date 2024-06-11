import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  updateCurrentSort,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
  showPriceDropdown,
} from "../reducers/globalSlice";
import { getFilters } from "../reducers/filterSlice";
import {
  categories,
  rarity,
  medium,
  artworks,
  artworksTwo,
  artworksThree,
} from "../data";

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

function Artworks() {
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const labelRef = useRef(null);
  const rarityRef = useRef(null);
  const mediumRef = useRef(null);
  const priceRef = useRef(null);

  const { sortDropdown, mediumDropdown, rarityDropdown, priceDropdown } =
    useSelector(getGlobal);
  const { selectedMedium, selectedRarity, selectedPrice } =
    useSelector(getFilters);

  const selectedFilter = [
    ...selectedMedium,
    ...selectedRarity,
    ...selectedPrice,
  ].sort((a, b) => a.timestamp - b.timestamp);

  const dispatch = useDispatch();

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));
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
            left={true}
            onClick={() => openModal()}
          />
          <FilterButton
            ref={rarityRef}
            text="Rarity"
            type="filter"
            isDropdown={rarityDropdown}
            count={selectedRarity.length}
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
            type="price"
            isDropdown={priceDropdown}
            onClick={() => openDropdown("price")}
          />
        </FilterComponent>
        <SortButton ref={labelRef} onClick={() => openDropdown("sort")} />
      </FilterSort>

      <Section type="basic">
        <SectionInfo
          info={`${artworks.length * 2 + artworksTwo.length} Artworks:`}
        />
        <Spacer small={true} />
        <ArtworkGrid>
          <ArtworkGridColumn style={style1}>
            {artworks.map((artwork) => (
              <ArtworkPoster key={artwork.id} poster={artwork} />
            ))}
          </ArtworkGridColumn>
          <ArtworkGridColumn style={style1}>
            {artworksTwo.map((artwork) => (
              <ArtworkPoster key={artwork.id} poster={artwork} />
            ))}
          </ArtworkGridColumn>
          <ArtworkGridColumn style={style2}>
            {artworksThree.map((artwork) => (
              <ArtworkPoster key={artwork.id} poster={artwork} />
            ))}
          </ArtworkGridColumn>
        </ArtworkGrid>
      </Section>

      <Pagination />

      {/* <Spacer /> */}

      <NewsLetter />

      <div>
        {sortDropdown && (
          <SortComponent
            ref={labelRef}
            selected={selected}
            handleSort={handleSort}
          />
        )}
      </div>
      <div>
        {mediumDropdown && (
          <FilterDropdown ref={mediumRef} type="medium">
            {medium.map((item, i) => (
              <SelectComponent key={i} item={item} type="medium" />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {rarityDropdown && (
          <FilterDropdown ref={rarityRef} type="rarity">
            {rarity.map((item, i) => (
              <SelectComponent key={i} item={item} type="rarity" />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {priceDropdown && (
          <FilterDropdown ref={priceRef} type="price">
            <PriceSlider />
          </FilterDropdown>
        )}
      </div>

      <div>
        <FilterModal isShowModal={showModal} onCloseModal={closeModal}>
          <AllFilters onCloseModal={closeModal} />
        </FilterModal>
      </div>
    </div>
  );
}

export default Artworks;
