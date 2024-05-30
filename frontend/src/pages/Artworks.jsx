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
          <FilterButton text="All Filters" left={true}>
            <svg
              viewBox="0 0 18 18"
              fill="currentColor"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              <path d="M10.006 11V9.99997H11.006V13H10.006V12H4V11H10.006ZM7.996 6.99997V7.99997H6.996V4.99997H7.996V5.99997H14V6.99997H7.996ZM6 5.99997V6.99997H4V5.99997H6ZM12 12V11H14V12H12Z"></path>
            </svg>
          </FilterButton>
          <FilterButton text="Rarity">
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
                d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
              ></path>
            </svg>
          </FilterButton>
          <FilterButton text="Medium">
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
                d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
              ></path>
            </svg>
          </FilterButton>
          <FilterButton text="Price Range">
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
                d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
              ></path>
            </svg>
          </FilterButton>
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
    </div>
  );
}

export default Artworks;
