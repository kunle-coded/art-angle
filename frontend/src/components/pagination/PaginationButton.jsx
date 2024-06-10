import styles from "./PaginationButton.module.css";

function PaginationButton({ isLink, linkHref, direction = "prev", onClick }) {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  if (isLink) {
    return (
      <a href={linkHref} className={styles.btnLink} onClick={onClick}>
        <div
          className={`${styles.icon} ${
            direction === "next" ? styles.next : styles.prev
          }`}
        >
          {direction === "next" ? (
            <svg viewBox="0 0 18 18" fill="currentColor" style={iconStyle}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.94006 15.94L5.06006 15.06L11.1201 8.99999L5.06006 2.93999L5.94006 2.05999L12.8801 8.99999L5.94006 15.94Z"
              ></path>
            </svg>
          ) : (
            <svg viewBox="0 0 18 18" fill="currentColor" style={iconStyle}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0601 15.94L5.12012 9L12.0601 2.06L12.9401 2.94L6.88012 9L12.9401 15.06L12.0601 15.94Z"
              ></path>
            </svg>
          )}
        </div>
        <span>{direction === "next" ? "Next" : "Prev"}</span>
      </a>
    );
  }

  return (
    <div className={styles.btnContainer}>
      <div
        className={`${styles.icon} ${
          direction === "next" ? styles.next : styles.prev
        }`}
      >
        {direction === "next" ? (
          <svg viewBox="0 0 18 18" fill="currentColor" style={iconStyle}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.94006 15.94L5.06006 15.06L11.1201 8.99999L5.06006 2.93999L5.94006 2.05999L12.8801 8.99999L5.94006 15.94Z"
            ></path>
          </svg>
        ) : (
          <svg viewBox="0 0 18 18" fill="currentColor" style={iconStyle}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0601 15.94L5.12012 9L12.0601 2.06L12.9401 2.94L6.88012 9L12.9401 15.06L12.0601 15.94Z"
            ></path>
          </svg>
        )}
      </div>
      <span>{direction === "next" ? "Next" : "Prev"}</span>
    </div>
  );
}

export default PaginationButton;
