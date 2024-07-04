function BackIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <path
        d="M6.5 12.25L1.25 7M1.25 7L6.5 1.75M1.25 7H14.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BackIcon;
