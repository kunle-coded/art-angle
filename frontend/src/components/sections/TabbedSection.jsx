import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TabbedSection.module.css";

import Spinner from "../../ui/Spinner";
import { useArtworksByPriceQuery } from "../../slices/artworksApiSlice";
import SmallCard from "../../ui/SmallCard";

function TabbedSection() {
  const [isSelected, setIsSelected] = useState(4);
  const [priceSort, setPriceSort] = useState({ min: 0, max: 2000000 });

  const { data: artworks, isFetching } = useArtworksByPriceQuery(priceSort);

  const tabsRef = useRef(null);

  const handleTabClick = useCallback(async (e) => {
    const tabIndex = e.target.tabIndex;
    const tabValue = e.target.dataset.value;
    const values = tabValue.split("-");

    const priceSort = {};

    if (values.length <= 1 && tabIndex === 0) {
      priceSort.max = Number(values[0]);
    } else if (values.length <= 1 && tabIndex === 4) {
      priceSort.min = Number(values[0]);
    } else {
      priceSort.min = Number(values[0]);
      priceSort.max = Number(values[1]);
    }

    setPriceSort(priceSort);

    setIsSelected(tabIndex);
  }, []);

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
          {artworks?.length >= 1 ? (
            <ul className={styles.cards}>
              {isFetching && (
                <div className={styles.spinnerContainer}>
                  <Spinner />
                </div>
              )}
              {artworks?.map((art) => (
                <SmallCard key={art.id} artwork={art} />
              ))}
            </ul>
          ) : (
            <div className={styles.emptyList}>
              There are currently no artworks for the chosen price range.
            </div>
          )}
        </div>
        {artworks?.length >= 1 && (
          <div className={styles.linkContainer}>
            <Link
              to={`/artworks?min=${priceSort.min}&max=${priceSort.max}`}
              className={styles.link}
            >
              View More Artworks by Selected Price
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default TabbedSection;
