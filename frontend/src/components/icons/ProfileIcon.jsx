function ProfileIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 34 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <path
        d="M17 13.875C20.4518 13.875 23.25 11.0768 23.25 7.625C23.25 4.17322 20.4518 1.375 17 1.375C13.5482 1.375 10.75 4.17322 10.75 7.625C10.75 11.0768 13.5482 13.875 17 13.875Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.625 34.7083C31.6354 15.2646 2.36458 15.2646 1.375 34.7083"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ProfileIcon;
