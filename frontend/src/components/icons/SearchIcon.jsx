function SearchIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 21"
      style={iconStyle}
    >
      <g fill="none" fillRule="evenodd">
        <rect
          width="8.903"
          height="1.25"
          x="14.747"
          y="17.027"
          fill="currentColor"
          rx=".625"
          transform="rotate(45 19.198 17.652)"
        ></rect>
        <ellipse
          cx="9.274"
          cy="9.073"
          stroke="currentColor"
          rx="8.774"
          ry="8.573"
        ></ellipse>
      </g>
    </svg>
  );
}

export default SearchIcon;
