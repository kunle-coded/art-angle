import { Link } from "react-router-dom";
import styles from "./TabbedSection.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePriceSort } from "../../slices/globalSlice";

function TabbedSection({ children, onSort }) {
  const [isSelected, setIsSelected] = useState(0);

  const tabsRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const priceSort = { min: 250000, max: 0 };
    dispatch(updatePriceSort(priceSort));
  }, [dispatch]);

  const handleTabClick = (e) => {
    const tabIndex = e.target.tabIndex;
    const tabValue = e.target.dataset.value;
    const values = tabValue.split("-");

    const priceSort = {};

    if (values.length <= 1) {
      priceSort.min = Number(values[0]);
      priceSort.max = 0;
    } else {
      priceSort.min = Number(values[0]);
      priceSort.max = Number(values[1]);
    }
    dispatch(updatePriceSort(priceSort));
    onSort(true);

    setIsSelected(tabIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setIsSelected((prevSelected) => (prevSelected + 1) % 5);
    } else if (e.key === "ArrowLeft") {
      setIsSelected((prevSelected) => (prevSelected - 1 + 5) % 5);
    }
  };

  useEffect(() => {
    if (tabsRef.current) {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div className="section_block">
      <section className={styles.container}>
        <div className={styles.tabsContainer}>
          <div className={styles.title}>Shop by Price</div>
          <div className={styles.tabs}>
            <ul
              ref={tabsRef}
              role="tablist"
              className={styles.tabList}
              onClick={handleTabClick}
            >
              <li
                role="tab"
                aria-selected={isSelected === 0}
                tabIndex="0"
                data-value="250000"
                className={`${styles.tab} ${
                  isSelected === 0 ? styles.selectedTab : ""
                }`}
              >
                Under ₦250k
              </li>
              <li
                role="tab"
                aria-selected={isSelected === 1}
                tabIndex="1"
                data-value="250000-500000"
                className={`${styles.tab} ${
                  isSelected === 1 ? styles.selectedTab : ""
                }`}
              >
                ₦250k - ₦500k
              </li>
              <li
                role="tab"
                aria-selected={isSelected === 2}
                tabIndex="2"
                data-value="500000-1000000"
                className={`${styles.tab} ${
                  isSelected === 2 ? styles.selectedTab : ""
                }`}
              >
                ₦500k - ₦1m
              </li>
              <li
                role="tab"
                aria-selected={isSelected === 3}
                tabIndex="3"
                data-value="1000000-2000000"
                className={`${styles.tab} ${
                  isSelected === 3 ? styles.selectedTab : ""
                }`}
              >
                ₦1m - ₦2m
              </li>
              <li
                role="tab"
                aria-selected={isSelected === 4}
                tabIndex="4"
                data-value="2000000"
                className={`${styles.tab} ${
                  isSelected === 4 ? styles.selectedTab : ""
                }`}
              >
                Over ₦2m
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <ul className={styles.cards}>{children}</ul>
        </div>
        <div className={styles.linkContainer}>
          <Link className={styles.link}>
            View More Artworks by Selected Price
          </Link>
        </div>
      </section>
    </div>
  );
}

export default TabbedSection;
