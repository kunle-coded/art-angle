import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PriceSlider.module.css";
import {
  getFilters,
  removePriceItem,
  updatePrice,
} from "../../slices/filterSlice";
import filterPrice from "../../helpers/filterPrice";
import { MAX_FILTER_PRICE, MIN_FILTER_PRICE } from "../../constants/constants";

function PriceSlider({ onPriceChange }) {
  const [minValue, setMinValue] = useState(MIN_FILTER_PRICE);
  const [maxValue, setMaxValue] = useState(MAX_FILTER_PRICE);
  const [inputMinValue, setInputMinValue] = useState("");
  const [inputMaxValue, setInputMaxValue] = useState("");

  const { priceFilter } = useSelector(getFilters);

  const dispatch = useDispatch();

  const { minPrice, maxPrice } = priceFilter;

  useEffect(() => {
    if (minPrice || maxPrice) {
      const minVal = Number(minPrice);
      const maxVal = Number(maxPrice);

      const isMinValueValid = Number.isFinite(minVal);
      const isMaxValueValid = Number.isFinite(maxVal);

      if (isMinValueValid) {
        setMinValue(minVal);
        setInputMinValue(minVal);
      }

      if (isMaxValueValid && maxVal < MAX_FILTER_PRICE) {
        setInputMaxValue(maxVal);
        setMaxValue(maxVal);
      }
    } else {
      setMinValue(MIN_FILTER_PRICE);
      setInputMinValue("");
      setMaxValue(MAX_FILTER_PRICE);
      setInputMaxValue("");
    }
  }, [maxPrice, minPrice, priceFilter]);

  function handleMinChange(e) {
    e.stopPropagation();
    const value = parseInt(e.target.value);
    if (value < maxValue) {
      setMinValue(value);
      setInputMinValue(value);

      // onPriceChange({ minPrice: value, maxPrice: maxValue });
    }
  }

  function handleMaxChange(e) {
    e.stopPropagation();

    const value = parseInt(e.target.value);
    if (value > minValue) {
      setMaxValue(value);

      // onPriceChange({ minPrice: minValue, maxPrice: value });
      if (value === MAX_FILTER_PRICE) {
        setInputMaxValue("");
      } else {
        setInputMaxValue(value);
      }
    }
  }

  function handleMinChangeEnd(e) {
    const priceInput = filterPrice(minValue, maxValue);
    const value = parseInt(e.target.value);

    if (priceInput !== null) {
      dispatch(updatePrice(priceInput));
      onPriceChange({ minPrice: value, maxPrice: maxValue });
    } else {
      dispatch(removePriceItem());
    }
  }

  function handleMaxChangeEnd(e) {
    const priceInput = filterPrice(minValue, maxValue);
    const value = parseInt(e.target.value);

    if (priceInput !== null) {
      dispatch(updatePrice(priceInput));
      onPriceChange({ minPrice: minValue, maxPrice: value });
    } else {
      dispatch(removePriceItem());
    }
  }

  function handleMinInput(e) {
    const value = e.target.value;
    if (Number(value) > MIN_FILTER_PRICE) {
      setInputMinValue(value);
      setMinValue(value);
      onPriceChange({ minPrice: value });
    } else {
      setInputMinValue("");
      dispatch(removePriceItem());
      onPriceChange({ minPrice: value });
    }
  }

  function handleMaxInput(e) {
    const value = e.target.value;

    if (Number(inputMaxValue) < MAX_FILTER_PRICE) {
      if (Number(inputMaxValue) === MAX_FILTER_PRICE - 1) {
        setInputMaxValue("");
      } else {
        setMaxValue(value);
        setInputMaxValue(value);
        onPriceChange({ maxPrice: value });
      }
    } else {
      setInputMaxValue("");
      dispatch(removePriceItem());
      onPriceChange({ maxPrice: value });
    }
  }

  function handleClick(e) {
    e.stopPropagation();
  }

  const minProgressPercent = (minValue / MAX_FILTER_PRICE) * 100;
  const maxProgressPercent = 100 - (maxValue / MAX_FILTER_PRICE) * 100;

  const translateY = `translateY(${-180}%)`;

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.spacer}></div>
      <div className={styles.slider}>
        <div
          className={styles.progress}
          style={{
            left: `${minProgressPercent}%`,
            right: `${maxProgressPercent}%`,
          }}
        ></div>
      </div>
      <div className={styles.rangeInput}>
        <input
          type="range"
          className={styles.rangeMin}
          min="0"
          step="10000"
          max="2000000"
          value={minValue}
          onChange={handleMinChange}
          onMouseUp={handleMinChangeEnd}
          onTouchEnd={handleMinChangeEnd}
        />
        <input
          type="range"
          className={styles.rangeMax}
          min="0"
          step="10000"
          max="2000000"
          value={maxValue}
          onChange={handleMaxChange}
          onMouseUp={handleMaxChangeEnd}
          onTouchEnd={handleMaxChangeEnd}
        />
      </div>

      <div className={styles.labels}>
        <div className={styles.labelText}>{`₦${MIN_FILTER_PRICE}`}</div>
        <div className={styles.labelText}>{`₦${
          MAX_FILTER_PRICE.toString().split("0")[0]
        }m+`}</div>
      </div>

      <div className={styles.spacer}></div>

      <div className={styles.priceInput}>
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInnerWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputField}>
                <input
                  name="price_min"
                  type="number"
                  title="Min"
                  placeholder=" "
                  min="0"
                  step="100"
                  value={inputMinValue}
                  className={styles.styledInput}
                  onChange={handleMinInput}
                />
                <label
                  htmlFor="price_min"
                  className={styles.inputLabel}
                  style={
                    inputMinValue > 0
                      ? {
                          transform: translateY,
                          undefined,
                          fontSize: "13px",
                          padding: "0px 5px",
                        }
                      : undefined
                  }
                >
                  Min
                  <span></span>
                </label>
                <div className={styles.currencyWrapper}>
                  <div className={styles.currency}>₦</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInnerWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputField}>
                <input
                  aria-label="Max price"
                  name="price_max"
                  type="number"
                  title="Max"
                  placeholder=" "
                  min="0"
                  step="100"
                  value={inputMaxValue}
                  className={styles.styledInput}
                  onChange={handleMaxInput}
                />
                <label
                  htmlFor="price_max"
                  className={styles.inputLabel}
                  style={
                    inputMaxValue
                      ? {
                          transform: translateY,
                          undefined,
                          fontSize: "13px",
                          padding: "0px 5px",
                        }
                      : undefined
                  }
                >
                  Max
                  <span></span>
                </label>
                <div className={styles.currencyWrapper}>
                  <div className={styles.currency}>₦</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSlider;
