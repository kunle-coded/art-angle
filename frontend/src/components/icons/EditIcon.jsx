function EditIcon({ small = false }) {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <g clipPath="url(#a)">
        <path
          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-12 12A.5.5 0 0 1 3.5 16h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l12-12zM10 3.707l-9 8.999V15h2.292l9.001-9L10 3.707zm2.5-2.5L10.707 3 13 5.293 14.793 3.5 12.5 1.207z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default EditIcon;
