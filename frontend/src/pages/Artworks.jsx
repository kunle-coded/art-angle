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
import { categories } from "../data";

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
import Modal from "../components/modal/Modal";
import AllFilters from "../components/filter/AllFilters";

const mediumArray = [
  "Painting",
  "Photography",
  "Sculpture",
  "Prints",
  "Work on Paper",
  "Drawing",
  "Design",
  "Textile",
];
const rarityArray = [
  "Unique",
  "Limited Edition",
  "Open Edition",
  "Unknown Edition",
];

function Artworks() {
  const [selected, setSelected] = useState(0);
  const [openFilterModal, setOpenFilterModal] = useState("");

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

  return (
    <div className="page">
      <PageHeader title="Collect artworks" subtitle="Browse by Categories" />

      <Section type="basic">
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
          <Modal>
            <Modal.Open opens="All filters">
              <FilterButton text="All Filters" left={true} />
            </Modal.Open>
            <Modal.Window name="All filters">
              <AllFilters />
            </Modal.Window>
          </Modal>
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
            isDropdown={priceDropdown}
            onClick={() => openDropdown("price")}
          />
        </FilterComponent>
        <SortButton ref={labelRef} onClick={() => openDropdown("sort")} />
      </FilterSort>

      <Section>
        <h1>Sort compo</h1>
      </Section>
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
            {mediumArray.map((item, i) => (
              <SelectComponent key={i} item={item} type="medium" />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {rarityDropdown && (
          <FilterDropdown ref={rarityRef} type="rarity">
            {rarityArray.map((item, i) => (
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
    </div>
  );
}

export default Artworks;
