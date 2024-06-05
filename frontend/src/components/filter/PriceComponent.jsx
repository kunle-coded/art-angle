import { useRef, useState } from "react";
import styles from "./PriceComponent.module.css";

function PriceComponent() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30000);

  const rangeRef = useRef(null);

  function handleMinChange(e) {
    // e.stopPropagation();
    console.log("Min slider value:", e.target.value);
    const value = parseInt(e.target.value);
    if (value < maxValue) {
      setMinValue(value);
    }
  }
  function handleMaxChange(e) {
    // e.stopPropagation();
    const value = parseInt(e.target.value);
    if (value > minValue) {
      setMaxValue(value);
    }
  }

  function handleClick(e) {
    e.stopPropagation();
  }

  if (rangeRef.current) {
    console.log(rangeRef.current.clientWidth);
  }

  const clipMin = `${(minValue / 30000) * 245}px`;
  const clipMax = `${(maxValue / 30000) * 245 - 24}px`;
  const clipMaxRight = `${((maxValue - minValue) / 30000) * 245}px`;

  console.log("min", clipMin);
  console.log("max", clipMax);
  console.log("max right", clipMaxRight);

  return (
    <div className={styles.priceContainer}>
      <div className={styles.priceSpacer}></div>
      <div className={styles.rangeTrack}>
        <div
          ref={rangeRef}
          className={styles.range}
          style={{ clip: `rect(0px, ${clipMax}, 2px, ${clipMin})` }}
        ></div>
        <input
          aria-label="Min price"
          type="range"
          min="0"
          max="30000"
          step="1000"
          value={minValue}
          className={styles.rangeSlider}
          onChange={handleMinChange}
          onClick={handleClick}
        />

        <input
          aria-label="Max price"
          type="range"
          min={minValue}
          max="30000"
          step="1000"
          value={maxValue}
          className={styles.rangeSlider}
          onChange={handleMaxChange}
          onClick={handleClick}
          style={{ clip: `rect(0px, 245px, 24px, ${clipMax})` }}
        />
      </div>
      <div className={styles.priceValues}></div>
    </div>
  );
}

export default PriceComponent;
