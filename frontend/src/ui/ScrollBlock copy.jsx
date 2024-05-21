import { useEffect, useRef, useState } from "react";
import styles from "./ScrollBlock.module.css";

function ScrollBlock({ children, title, align = false }) {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [valueNow, setValueNow] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);

  const contentsRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollContentRef = useRef(null);
  const thumbRef = useRef(null);

  const translateX = `translateX(${thumbPosition}px)`;

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      setStartX(e.clientX);

      const containerWidth = scrollContentRef.current.offsetWidth;
      const scrollWidth = scrollContentRef.current.scrollWidth;

      const scrollStart =
        scrollContentRef.current.scrollLeft +
        (deltaX / containerWidth) * scrollWidth;
      scrollContentRef.current.scrollLeft = scrollStart;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX]);

  const handleScroll = () => {
    const scrollbarWidth = scrollbarRef.current.offsetWidth;
    const contentWidth = scrollContentRef.current.offsetWidth;
    const scrollWidth = scrollContentRef.current.scrollWidth;
    const scrollLeft = scrollContentRef.current.scrollLeft;

    const parentStyle = getComputedStyle(contentsRef.current);
    const parentMarginLeft = parseFloat(parentStyle.marginLeft) || 0;
    const parentMarginRight = parseFloat(parentStyle.marginRight) || 0;

    const effectiveWidth =
      scrollbarWidth + parentMarginLeft - parentMarginRight;

    // const thumbPos =
    //   (scrollLeft / (scrollWidth - contentWidth)) * scrollbarWidth;
    // const thumbPos = (scrollLeft / contentWidth) * scrollbarWidth;

    const thumbPos =
      (scrollLeft / (scrollWidth - scrollbarWidth)) * (scrollbarWidth - 350);
    setThumbPosition(thumbPos);
    // console.log("thumb position", contentWidth / children.length);
    console.log("thumb position", thumbPos);
    console.log(
      "contents width",
      scrollLeft,
      contentWidth - scrollbarWidth - parentMarginLeft - parentMarginRight,
      (scrollLeft / (scrollWidth - scrollbarWidth)) * (scrollbarWidth - 200)
    );

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

  const handleScrollbarClick = (e) => {
    if (!e.target.className.includes("trackArea")) return;

    const containerWidth = scrollContentRef.current.offsetWidth;
    const scrollbarWidth = scrollbarRef.current.scrollWidth;

    const clickPositionX =
      e.clientX - scrollbarRef.current.getBoundingClientRect().left;

    const newScrollLeft = (clickPositionX / containerWidth) * scrollbarWidth;
    scrollContentRef.current.scrollLeft = newScrollLeft;
  };

  const handleButtonClick = (direction) => {
    const scrollStep = thumbRef.current.offsetWidth;

    let newScrollLeft;

    if (direction === 1) {
      newScrollLeft = scrollContentRef.current.scrollLeft + scrollStep;
    }

    if (direction === -1) {
      newScrollLeft = scrollContentRef.current.scrollLeft - scrollStep;
    }

    scrollContentRef.current.scrollLeft = newScrollLeft;
  };

  return (
    <div className="section_block">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div
            className={`${styles.sectionTitle} ${
              align ? styles.titleAlign : ""
            }`}
          >
            {title}
          </div>
        </div>
        <div className={styles.wrapper}>
          <nav className={styles.scrollNavigation}>
            <button
              aria-label="Previous page"
              className={`${styles.navigationArrow} ${styles.leftArrow}`}
              onClick={() => handleButtonClick(-1)}
              disabled={valueNow === 0 ? true : false}
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
              onClick={() => handleButtonClick(1)}
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
            ref={contentsRef}
            id="scrollableBlock"
            className={styles.contents}
          >
            <div
              ref={scrollContentRef}
              className={styles.contentsWrapper}
              onScroll={handleScroll}
            >
              <ul className={styles.contentList}>{children}</ul>
            </div>
          </div>
          <div
            role="scrollbar"
            aria-controls="scrollableBlock"
            aria-orientation="vertical"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={valueNow}
            className={styles.scrollbar}
          >
            <div
              ref={scrollbarRef}
              className={styles.trackArea}
              onClick={(e) => handleScrollbarClick(e)}
            ></div>
            <div
              ref={thumbRef}
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
