import styles from "./ScrollBlock.module.css";

function ScrollBlock({ children, title }) {
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
          <div className={styles.contents}>
            <div className={styles.contentsWrapper}>
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
              </ul>
            </div>
          </div>
          <div
            role="scrollbar"
            aria-orientation="vertical"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="35"
            className={styles.scrollbar}
          >
            <div className={styles.trackArea}></div>
            <div className={styles.scrollbarThumb}>
              <button
                aria-label="Thumb"
                type="button"
                className={styles.clickableScrollThumb}
                cursor="pointer"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollBlock;
