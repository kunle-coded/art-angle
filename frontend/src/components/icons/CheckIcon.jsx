function CheckIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7064 0.293C13.8939 0.480528 13.9992 0.734836 13.9992 1C13.9992 1.26516 13.8939 1.51947 13.7064 1.707L5.70643 9.707C5.5189 9.89447 5.2646 9.99979 4.99943 9.99979C4.73427 9.99979 4.47996 9.89447 4.29243 9.707L0.292431 5.707C0.110272 5.5184 0.00947813 5.2658 0.0117566 5.0036C0.014035 4.7414 0.119204 4.49059 0.304612 4.30518C0.49002 4.11977 0.740832 4.0146 1.00303 4.01233C1.26523 4.01005 1.51783 4.11084 1.70643 4.293L4.99943 7.586L12.2924 0.293C12.48 0.105529 12.7343 0.000213623 12.9994 0.000213623C13.2646 0.000213623 13.5189 0.105529 13.7064 0.293Z"
        fill="#2E7D32"
      />
    </svg>
  );
}

export default CheckIcon;