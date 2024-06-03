import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  updateCurrentSort,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
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

  const labelRef = useRef(null);
  const rarityRef = useRef(null);
  const mediumRef = useRef(null);
  const priceRef = useRef(null);

  const { sortDropdown, mediumDropdown, rarityDropdown } =
    useSelector(getGlobal);
  const { selectedFilter } = useSelector(getFilters);

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
          <FilterButton text="All Filters" left={true} />
          <FilterButton
            ref={rarityRef}
            text="Rarity"
            onClick={() => openDropdown("rarity")}
          />
          <FilterButton
            ref={mediumRef}
            text="Medium"
            onClick={() => openDropdown("medium")}
          />
          <FilterButton ref={priceRef} text="Price Range" />
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
          <FilterDropdown ref={mediumRef}>
            {mediumArray.map((item, i) => (
              <SelectComponent key={i} item={item} />
            ))}
          </FilterDropdown>
        )}
      </div>
      <div>
        {rarityDropdown && (
          <FilterDropdown ref={rarityRef}>
            {rarityArray.map((item, i) => (
              <SelectComponent key={i} item={item} />
            ))}
          </FilterDropdown>
        )}
      </div>
    </div>
  );
}

export default Artworks;
