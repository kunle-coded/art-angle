import { useEffect, useRef, useState } from "react";
import styles from "./ScrollSection.module.css";
import SectionTitle from "../../ui/SectionTitle";
import Spacer from "../../ui/Spacer";

function ScrollBlock({
  children,
  title,
  align = false,
  alignItems = false,
  margin = true,
  titleSize,
}) {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [valueNow, setValueNow] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [thumbWidth, setThumbWidth] = useState(200);

  const contentsRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollContentRef = useRef(null);
  const thumbRef = useRef(null);
  const observer = useRef(ResizeObserver);

  // const translateX = `translateX(${thumbPosition}px)`;

  const handleThumbResize = () => {
    if (scrollbarRef.current && scrollContentRef.current) {
      const trackSize = scrollbarRef.current.clientWidth;
      const contentVisible = scrollContentRef.current.clientWidth;
      const scrollWidth = scrollContentRef.current.scrollWidth;

      const newWidth = Math.max(
        (contentVisible / scrollWidth) * trackSize,
        200
      );

      setThumbWidth(newWidth);
    }
  };

  useEffect(() => {
    if (scrollContentRef.current) {
      const content = scrollContentRef.current;

      observer.current = new ResizeObserver(() => {
        handleThumbResize();
      });

      observer.current.observe(content);

      return () => {
        observer.current?.unobserve(content);
      };
    }
  }, []);

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
    const contentBaseWidth = scrollContentRef.current.clientWidth;
    const contentWidth = scrollContentRef.current.scrollWidth;
    const contentLeft = scrollContentRef.current.scrollLeft;
    const trackWidth = scrollbarRef.current.clientWidth;

    let newLeft = (contentLeft / contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);
    setThumbPosition(newLeft);

    const maxScrollTop = contentWidth - contentBaseWidth;
    const scrollPercentage = (contentLeft / maxScrollTop) * 100;

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

    const scrollWidth = scrollContentRef.current.scrollWidth;
    const scrollbarWidth = scrollbarRef.current.clientWidth;

    const clickPositionX =
      e.clientX - scrollbarRef.current.getBoundingClientRect().left;

    const newScrollLeft = (clickPositionX / scrollbarWidth) * scrollWidth;

    scrollContentRef.current.scrollLeft = newScrollLeft;
  };

  const handleButtonClick = (direction) => {
    const cardWidth =
      scrollContentRef.current.querySelector(".card").offsetWidth;

    let newScrollLeft;

    if (direction === 1) {
      newScrollLeft = cardWidth;
    }

    if (direction === -1) {
      newScrollLeft = -cardWidth;
    }

    scrollContentRef.current.scrollBy({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className={margin ? "section_block" : "section_basic"}>
      <section className={styles.container}>
        {title && <SectionTitle title={title} align={align} size={titleSize} />}
        {title && titleSize === "big" && !align && <Spacer small />}
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
              <ul
                className={`${styles.contentList} ${
                  alignItems ? styles.alignEnd : ""
                }`}
              >
                {children}
              </ul>
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
              style={{ cursor: "pointer" }}
            ></div>
            <div
              ref={thumbRef}
              className={styles.scrollbarThumb}
              style={{ width: `${thumbWidth}px`, left: `${thumbPosition}px` }}
            >
              <button
                aria-label="Thumb"
                type="button"
                className={`${styles.clickableScrollThumb} ${
                  isDragging ? styles.noSelect : ""
                }`}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onMouseDown={(target) => handleDragable(target)}
              ></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScrollBlock;
