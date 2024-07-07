function ShieldIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <svg
      viewBox="0 0 38 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
    >
      <path
        d="M14.8333 33.4167L6.5 25.0833L9.4375 22.1458L14.8333 27.5208L28.5625 13.7917L31.5 16.75M19 0.0833282L0.25 8.41666V20.9167C0.25 32.4792 8.25 43.2917 19 45.9167C29.75 43.2917 37.75 32.4792 37.75 20.9167V8.41666L19 0.0833282Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ShieldIcon;
