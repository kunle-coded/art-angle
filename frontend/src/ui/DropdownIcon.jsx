function DropdownIcon({ isDropdown }) {
  const styles = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  if (isDropdown) {
    return (
      <svg viewBox="0 0 18 18" fill="currentColor" style={styles}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0601 12.94L9.00006 6.88001L2.94006 12.94L2.06006 12.06L9.00006 5.12001L15.9401 12.06L15.0601 12.94Z"
        ></path>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 18 18" fill="currentColor" style={styles}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00006 12.88L2.06006 5.94001L2.94006 5.06001L9.00006 11.12L15.0601 5.06001L15.9401 5.94001L9.00006 12.88Z"
      ></path>
    </svg>
  );
}

export default DropdownIcon;
