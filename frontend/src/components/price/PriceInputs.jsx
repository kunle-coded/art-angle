import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SHIPPING_COST } from "../../constants/constants";
import formatCurrency from "../../helpers/formatCurrency";
import { useField } from "../../hooks";
import FormInput from "../../ui/FormInput";
import styles from "./PriceInputs.module.css";
import { updatePrice, updateTotalPrice } from "../../slices/artworkSlice";

function PriceInputs() {
  const price = useField("number");
  const { onReset: resetPrice, ...priceProps } = price;

  const dispatch = useDispatch();

  useEffect(() => {
    if (price.value) {
      dispatch(updatePrice(Number(price.value)));
    }

    dispatch(updateTotalPrice(Number(price.value) + SHIPPING_COST));
  }, [dispatch, price.value]);

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.info}>
          Price your artwork and see the all-in price collectors will see.
          <span>
            <a href="/">SEE TIPS FOR PRICING</a>
          </span>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper}>
            <div className={styles.gridRowLabel}>
              <div className={`${styles.label} ${styles.first}`}>
                Artwork Price
              </div>
            </div>
            <div className={styles.gridRowValue}>
              <FormInput
                placeholder="Enter price"
                label="Price"
                size="small"
                {...priceProps}
              />
            </div>
          </div>
          <div className={styles.gridWrapper}>
            <div className={styles.gridRowLabel}>
              <div className={styles.label}>Your Commission</div>
            </div>
            <div className={styles.gridRowValue}>
              <div className={styles.valueDisplay}>
                {formatCurrency(Number(price.value) * 0.6)}
              </div>
            </div>
          </div>
          <div className={styles.gridWrapper}>
            <div className={styles.gridRowLabel}>
              <div className={styles.label}>Shipping & Handling</div>
              <div className={styles.labelInfo}>Paid by Collector</div>
            </div>
            <div className={styles.gridRowValue}>
              <div className={styles.valueDisplay}>
                {formatCurrency(SHIPPING_COST)}
              </div>
            </div>
          </div>
          <div className={styles.gridWrapper}>
            <div className={styles.gridRowLabel}>
              <div className={styles.label}>Listed Price</div>
              <div className={styles.labelInfo}>
                What the collector will see
              </div>
            </div>
            <div className={styles.gridRowValue}>
              <div className={styles.valueDisplay}>
                {formatCurrency(Number(price.value) + SHIPPING_COST)}
              </div>
              <div className={styles.labelInfo}>
                Artwork price + Shipping & Handling
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceInputs;
