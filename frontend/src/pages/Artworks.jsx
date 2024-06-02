import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGlobal, updateCurrentSort } from "../reducers/globalSlice";

import Section from "../components/sections/Section";
import CategoryCardSmall from "../ui/CategoryCardSmall";
import PageHeader from "../ui/PageHeader";
import PosterBlock from "../ui/PosterBlock";
import { categories } from "../data";
import FilterSort from "../ui/FilterSort";
import SortComponent from "../components/sort/SortComponent";
import SortButton from "../components/sort/SortButton";
import FilterComponent from "../components/filter/FilterComponent";
import FilterButton from "../components/filter/FilterButton";
import FilterDropdown from "../components/filter/FilterDropdown";
import SelectComponent from "../components/filter/SelectComponent";
import { getFilters } from "../reducers/filterSlice";

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

function Artworks() {
  const [selected, setSelected] = useState(0);

  const labelRef = useRef(null);
  const rarityRef = useRef(null);
  const mediumRef = useRef(null);
  const priceRef = useRef(null);

  const { showSortDropdown, filterDropdown } = useSelector(getGlobal);
  const { selectedMedium } = useSelector(getFilters);

  const dispatch = useDispatch();

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));
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

      <FilterSort filters={selectedMedium}>
        <FilterComponent>
          <FilterButton text="All Filters" left={true} />
          <FilterButton ref={rarityRef} text="Rarity" />
          <FilterButton ref={mediumRef} text="Medium" />
          <FilterButton ref={priceRef} text="Price Range" />
        </FilterComponent>
        <SortButton ref={labelRef} />
      </FilterSort>

      <Section>
        <h1>Sort compo</h1>
      </Section>
      <div>
        {showSortDropdown && (
          <SortComponent
            ref={labelRef}
            selected={selected}
            handleSort={handleSort}
          />
        )}
      </div>
      <div>
        {filterDropdown && (
          <FilterDropdown ref={mediumRef}>
            {mediumArray.map((item, i) => (
              <SelectComponent key={i} item={item} />
            ))}
          </FilterDropdown>
        )}
      </div>
    </div>
  );
}

export default Artworks;
