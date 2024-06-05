import { useDispatch } from "react-redux";
import { resetFilter } from "../reducers/filterSlice";
import styles from "./FilterSort.module.css";
import SelectedFilterButton from "./SelectedFilterButton";

function FilterSort({ children, filters = [] }) {
  const dispatch = useDispatch();

  function handleClearFilters() {
    dispatch(resetFilter());
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        {filters.length >= 1 ? (
          <div className={styles.display}>
            <div className={styles.filters}>
              {filters.map((filter, index) => (
                <SelectedFilterButton key={index} text={filter.value} />
              ))}
              <button className={styles.clear} onClick={handleClearFilters}>
                <div className={styles.clearText}>Clear all</div>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FilterSort;
