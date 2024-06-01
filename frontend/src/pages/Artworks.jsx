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

function Artworks() {
  const [selected, setSelected] = useState(0);

  const labelRef = useRef(null);

  const { showSortDropdown } = useSelector(getGlobal);

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

      <FilterSort>
        <FilterComponent>
          <FilterButton text="All Filters" left={true} />
          <FilterButton text="Rarity" />
          <FilterButton text="Medium" />
          <FilterButton text="Price Range" />
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
        <FilterDropdown />
      </div>
    </div>
  );
}

export default Artworks;
