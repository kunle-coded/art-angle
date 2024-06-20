import { Link } from "react-router-dom";
import styles from "./TabbedSection.module.css";
import { useEffect, useRef, useState } from "react";

function TabbedSection({ children }) {
  const [isSelected, setIsSelected] = useState(0);

  const tabsRef = useRef(null);

  const handleTabClick = (e) => {
    const tabIndex = e.target.tabIndex;
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
