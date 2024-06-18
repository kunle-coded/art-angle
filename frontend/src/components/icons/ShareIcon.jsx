function ShareIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      style={iconStyle}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 .003l3.354 3.354-.708.707L6.5 1.917V10h-1V1.917L3.354 4.064l-.708-.707L6 .003zM0 5.5h4v1H1V15h10V6.5H8v-1h4V16H0V5.5z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default ShareIcon;
