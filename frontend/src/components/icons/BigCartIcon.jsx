function BigCartIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 16"
      style={iconStyle}
    >
      <g fill="none" fillRule="evenodd" transform="translate(0 1)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M0 .365h3.569l2.855 10h11.432L20 3.763"
        ></path>
        <circle cx="16.25" cy="13.512" r="1.25" fill="currentColor"></circle>
        <circle cx="7.825" cy="13.707" r="1.25" fill="currentColor"></circle>
      </g>
    </svg>
  );
}

export default BigCartIcon;
