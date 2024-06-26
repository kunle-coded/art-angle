function LogoIcon() {
  const iconStyle = {
    position: "absolute",
    inset: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <div>
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <path d="M2 0.5V42H43.5" stroke="#333333" strokeWidth="3" />
        <path d="M8 2H42V36" stroke="#333333" strokeWidth="3" />
        <path
          d="M19.6011 15.9724L17.2866 20.5H14.8318L22.5 6.06575L30.1682 20.5H27.5606L25.3232 15.9783L22.9481 11.1783L22.5073 10.2873L22.0548 11.1724L19.6011 15.9724Z"
          fill="#333333"
          stroke="#333333"
        />
        <path
          d="M18.5 14.5C20 18.0185 25 18 26.5 14.5"
          stroke="#333333"
          strokeWidth="3"
        />
        <path
          d="M25.3989 28.0276L27.7134 23.5H30.1682L22.5 37.9343L14.8318 23.5H17.4394L19.6768 28.0217L22.0519 32.8217L22.4927 33.7127L22.9452 32.8276L25.3989 28.0276Z"
          fill="#333333"
          stroke="#333333"
        />
        <path
          d="M26.5 29.5C25 25.9815 20 26 18.5 29.5"
          stroke="#333333"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export default LogoIcon;
