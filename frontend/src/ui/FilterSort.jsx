import { useDispatch } from "react-redux";
import { resetFilter } from "../slices/filterSlice";
import styles from "./FilterSort.module.css";
import SelectedFilterButton from "./SelectedFilterButton";
import { useClearUrlParams } from "../hooks";
import { useEffect, useState } from "react";

function FilterSort({ children, filters = [] }) {
  const [isShowClearAll, setIsShowClearAll] = useState(false);

  const dispatch = useDispatch();

  const clearParams = useClearUrlParams();

  console.log(filters);

  useEffect(() => {
    const isValue = filters.filter((filter) => filter.value);
    if (isValue.length >= 2) {
      setIsShowClearAll(true);
    } else {
      setIsShowClearAll(false);
    }
  }, [filters]);

  function handleClearFilters() {
    dispatch(resetFilter());
    clearParams();
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        {filters.length >= 1 ? (
          <div className={styles.display}>
            <div className={styles.filters}>
              {filters.map(
                (filter, index) =>
                  filter.value && (
                    <SelectedFilterButton key={index} text={filter.value} />
                  )
              )}
              {isShowClearAll && (
                <button className={styles.clear} onClick={handleClearFilters}>
                  <div className={styles.clearText}>Clear all</div>
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FilterSort;
