function FocusComponent({ isFocus }) {
  return (
    <div
      data-focus-guard="true"
      tabIndex={isFocus ? 0 : -1}
      style={{
        width: "1px",
        height: "0",
        padding: "0px",
        overflow: "hidden",
        position: "fixed",
        top: "1px",
        left: "1px",
      }}
      {...(isFocus
        ? { "aria-hidden": "true", "data-focus-on-hidden": "true" }
        : {})}
    ></div>
  );
}

export default FocusComponent;
