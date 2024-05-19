import { useEffect, useRef, useState } from "react";
import styles from "./ScrollBlock.module.css";

function ScrollBlock({ children, title }) {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [valueNow, setValueNow] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [leftScroll, setLeftScroll] = useState(null);
  const [startX, setStartX] = useState(null);

  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollContentRef = useRef(null);

  const translateX = `translateX(${thumbPosition}px)`;

  useEffect(() => {
    const handleMove = () => {
      const deltaX = scrollContentRef.current.clientX - startX;
      setStartX(scrollContentRef.current.clientX);

      console.log(
        "scroll startX",
        startX,
        "clientX",
        scrollContentRef.current.clientX
      );

      const containerWidth = contentRef.current.scrollWidth;
      const scrollbarWidth = scrollbarRef.current.offsetWidth;

      const scrollStart =
        leftScroll + (deltaX / containerWidth) * scrollbarWidth;
      scrollbarRef.current.scrollLeft = scrollStart;
      console.log("start x", scrollbarRef.current.scrollLeft);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
    }

    handleScroll();

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, [isDragging, leftScroll, startX]);

  const handleScroll = () => {
    const containerWidth = contentRef.current.offsetWidth;
    const scrollbarWidth = scrollbarRef.current.offsetWidth;
    const contentWidth = scrollContentRef.current.offsetWidth;
    const scrollWidth = scrollContentRef.current.scrollWidth;
    const scrollLeft = scrollContentRef.current.scrollLeft;

    const thumbPos = (scrollLeft / scrollbarWidth) * containerWidth;

    setLeftScroll(scrollLeft);
    setThumbPosition(thumbPos);

    const maxScrollTop = scrollWidth - contentWidth;
    const scrollPercentage = (scrollLeft / maxScrollTop) * 100;

    if (scrollPercentage >= 100) {
      setValueNow(scrollPercentage.toFixed());
    } else {
      setValueNow(scrollPercentage);
    }
  };

  const handleDragable = (target) => {
    setIsDragging(true);
    setStartX(target.clientX);
  };

  const handleClickable = (target) => {
    // console.log("clickable", target);
    // console.log("clickable", contentRef.current.clientWidth);
  };

  return (
    <div className="section_block">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.sectionTitle}>Shop by Category</div>
        </div>
        <div className={styles.wrapper}>
          <nav className={styles.scrollNavigation}>
            <button
              aria-label="Previous page"
              className={`${styles.navigationArrow} ${styles.leftArrow}`}
            >
              <div className={styles.previousNextIcon}>
                <svg viewBox="0 0 18 18" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0601 15.94L5.12012 9L12.0601 2.06L12.9401 2.94L6.88012 9L12.9401 15.06L12.0601 15.94Z"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              aria-label="Next page"
              className={`${styles.navigationArrow} ${styles.rightArrow}`}
            >
              <div className={styles.previousNextIcon}>
                <svg viewBox="0 0 18 18" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.94006 15.94L5.06006 15.06L11.1201 8.99999L5.06006 2.93999L5.94006 2.05999L12.8801 8.99999L5.94006 15.94Z"
                  ></path>
                </svg>
              </div>
            </button>
          </nav>
          <div
            id="scrollableBlock"
            ref={contentRef}
            className={styles.contents}
          >
            <div
              ref={scrollContentRef}
              className={styles.contentsWrapper}
              onScroll={handleScroll}
            >
              <ul className={styles.contentList}>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
                <li className={styles.listItem}>
                  <h1>scrollable content</h1>
                </li>
              </ul>
            </div>
          </div>
          <div
            ref={scrollbarRef}
            role="scrollbar"
            aria-controls="scrollableBlock"
            aria-orientation="vertical"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={valueNow}
            className={styles.scrollbar}
            onClick={(e) => handleClickable(e)}
          >
            <div className={styles.trackArea}></div>
            <div
              className={styles.scrollbarThumb}
              style={{ transform: translateX }}
            >
              <button
                aria-label="Thumb"
                type="button"
                className={`${styles.clickableScrollThumb} ${
                  isDragging ? styles.noSelect : ""
                }`}
                onMouseDown={(target) => handleDragable(target)}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollBlock;
