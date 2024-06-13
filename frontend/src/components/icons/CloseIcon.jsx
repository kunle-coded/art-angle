function CloseIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg viewBox="0 0 18 18" fill="currentColor" style={iconStyle}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.88006 9.00001L14.4401 13.56L13.5601 14.44L9.00006 9.88001L4.44006 14.44L3.56006 13.56L8.12006 9.00001L3.56006 4.44001L4.44006 3.56001L9.00006 8.12001L13.5601 3.56001L14.4401 4.44001L9.88006 9.00001Z"
      ></path>
    </svg>
  );
}

export default CloseIcon;
