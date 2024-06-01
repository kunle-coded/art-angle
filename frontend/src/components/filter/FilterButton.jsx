import styles from "./FilterButton.module.css";

function FilterButton({ text, left = false, children }) {
  return (
    <div>
      <button
        aria-expanded="false"
        aria-haspopup
        className={styles.filterButton}
        style={{ flexDirection: left ? "row-reverse" : "unset" }}
      >
        <div className={styles.text}>{text}</div>
        <div className={styles.icon}>
          {left ? (
            <svg
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              <path
                d="M13.5 9H15M13.5 9C13.5 8.60218 13.342 8.22064 13.0607 7.93934C12.7794 7.65804 12.3978 7.5 12 7.5C11.6022 7.5 11.2206 7.65804 10.9393 7.93934C10.658 8.22064 10.5 8.60218 10.5 9M13.5 9C13.5 9.39782 13.342 9.77936 13.0607 10.0607C12.7794 10.342 12.3978 10.5 12 10.5C11.6022 10.5 11.2206 10.342 10.9393 10.0607C10.658 9.77936 10.5 9.39782 10.5 9M10.5 9L3 9M4.5 4.5C4.5 4.89782 4.65804 5.27936 4.93934 5.56066C5.22064 5.84196 5.60218 6 6 6C6.39782 6 6.77936 5.84196 7.06066 5.56066C7.34196 5.27936 7.5 4.89782 7.5 4.5M4.5 4.5C4.5 4.10218 4.65804 3.72064 4.93934 3.43934C5.22064 3.15804 5.60218 3 6 3C6.39782 3 6.77936 3.15804 7.06066 3.43934C7.34196 3.72064 7.5 4.10218 7.5 4.5M4.5 4.5H3M7.5 4.5L15 4.5M4.5 13.5C4.5 13.8978 4.65804 14.2794 4.93934 14.5607C5.22064 14.842 5.60218 15 6 15C6.39782 15 6.77936 14.842 7.06066 14.5607C7.34196 14.2794 7.5 13.8978 7.5 13.5M4.5 13.5C4.5 13.1022 4.65804 12.7206 4.93934 12.4393C5.22064 12.158 5.60218 12 6 12C6.39782 12 6.77936 12.158 7.06066 12.4393C7.34196 12.7206 7.5 13.1022 7.5 13.5M4.5 13.5H3M7.5 13.5L15 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 18 18"
              fill="currentColor"
              style={{
                position: "absolute",
                inset: "0px",
                width: "100%",
                height: "100%",
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
              ></path>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

export default FilterButton;
