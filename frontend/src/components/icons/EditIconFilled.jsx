function EditIconFilled({ small = false }) {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <path
        d="M10.586 1.58599C10.7705 1.39497 10.9912 1.24261 11.2352 1.13779C11.4792 1.03297 11.7416 0.977801 12.0072 0.975494C12.2728 0.973186 12.5361 1.02379 12.7819 1.12435C13.0277 1.22491 13.251 1.37342 13.4388 1.5612C13.6266 1.74899 13.7751 1.97229 13.8756 2.21809C13.9762 2.46388 14.0268 2.72724 14.0245 2.9928C14.0222 3.25836 13.967 3.5208 13.8622 3.7648C13.7574 4.00881 13.605 4.2295 13.414 4.41399L12.621 5.20699L9.793 2.37899L10.586 1.58599ZM8.379 3.79299L0 12.172V15H2.828L11.208 6.62099L8.379 3.79299Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default EditIconFilled;
