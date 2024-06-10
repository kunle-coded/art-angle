import { useEffect, useState } from "react";
import styles from "./PriceSlider.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  removePriceItem,
  updatePrice,
} from "../../reducers/filterSlice";
import filterPrice from "../../helpers/filterPrice";
import { MAX_FILTER_PRICE } from "../../constants";
import {
  disablePriceButton,
  enablePriceButton,
} from "../../reducers/globalSlice";

function PriceSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(MAX_FILTER_PRICE);
  const [inputMinValue, setInputMinValue] = useState("");
  const [inputMaxValue, setInputMaxValue] = useState("");

  const { selectedPrice } = useSelector(getFilters);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPrice.length >= 1) {
      dispatch(enablePriceButton());
    } else {
      dispatch(disablePriceButton());
    }
  }, [dispatch, selectedPrice.length]);

  function handleMinChange(e) {
    e.stopPropagation();
    const value = parseInt(e.target.value);
    if (value < maxValue) {
      setMinValue(value);
      setInputMinValue(value);
    }
  }

  function handleMaxChange(e) {
    e.stopPropagation();
    const value = parseInt(e.target.value);
    if (value > minValue) {
      setMaxValue(value);
      if (value === MAX_FILTER_PRICE) {
        setInputMaxValue("");
      } else {
        setInputMaxValue(value);
      }
    }
  }

  function handleMinChangeEnd() {
    const priceInput = filterPrice(minValue, maxValue);

    if (priceInput !== null) {
      dispatch(updatePrice(priceInput));
    } else {
      dispatch(removePriceItem());
    }
  }

  function handleMaxChangeEnd() {
    const priceInput = filterPrice(minValue, maxValue);

    if (priceInput !== null) {
      dispatch(updatePrice(priceInput));
    } else {
      dispatch(removePriceItem());
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
          max="3000000"
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
          max="3000000"
          value={maxValue}
          onChange={handleMaxChange}
          onMouseUp={handleMaxChangeEnd}
          onTouchEnd={handleMaxChangeEnd}
        />
      </div>

      <div className={styles.labels}>
        <div className={styles.labelText}>₦0</div>
        <div className={styles.labelText}>₦3m+</div>
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
                  onChange={(e) => setInputMinValue(e.target.value)}
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
                  onChange={(e) => setInputMaxValue(e.target.value)}
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
