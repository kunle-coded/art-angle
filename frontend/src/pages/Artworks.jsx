import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPosition,
  showDropdown,
  closeDropdown,
  setPadding,
  removePadding,
  getGlobal,
  updateCurrentSort,
} from "../reducers/globalSlice";

import Section from "../components/sections/Section";
import CategoryCardSmall from "../ui/CategoryCardSmall";
import PageHeader from "../ui/PageHeader";
import PosterBlock from "../ui/PosterBlock";
import { categories } from "../data";
import FilterSort from "../ui/FilterSort";
import SortComponent from "../ui/SortComponent";
import SortButton from "../ui/SortButton";

function Artworks() {
  const [selected, setSelected] = useState(0);
  const sortRef = useRef(null);
  const labelRef = useRef(null);

  const { showSortDropdown } = useSelector(getGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showSortDropdown) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSortDropdown]);

  useEffect(() => {
    if (showSortDropdown) {
      const labelRect = labelRef.current.getBoundingClientRect();
      const sortRect = sortRef.current.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const spaceAbove = labelRect.top;
      const spaceBelow = viewportHeight - labelRect.bottom;

      const posObj = { top: 0, left: 0 };
      if (spaceBelow > sortRect.height || spaceBelow > spaceAbove) {
        posObj.top = labelRect.bottom;
        posObj.left = labelRect.left - 100;
        dispatch(removePadding());
      } else {
        posObj.top = labelRect.top - sortRect.height;
        posObj.left = labelRect.left - 100;
        dispatch(setPadding());
      }

      dispatch(setPosition(posObj));
    }
  }, [dispatch, showSortDropdown]);

  function handleShowSort() {
    dispatch(showDropdown());
  }

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));
  }

  function handleCloseDropdown(e) {
    if (!showSortDropdown) return;
    dispatch(closeDropdown());
  }

  return (
    <div className="page" onClick={handleCloseDropdown}>
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
        {/* <SortComponent /> */}
        <h1>filter component</h1>
        <SortButton ref={labelRef} handleShowSort={handleShowSort} />
      </FilterSort>

      <Section>
        <h1>Sort compo</h1>
      </Section>
      <div>
        {/* <SortComponent ref={sortRef} /> */}
        {showSortDropdown && (
          <SortComponent
            ref={sortRef}
            handleSort={handleSort}
            selected={selected}
          />
        )}
      </div>
    </div>
  );
}

export default Artworks;
