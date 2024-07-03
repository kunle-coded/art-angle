import { useField } from "../../hooks";
import Input from "../../ui/Input";
import styles from "./ShippingAddress.module.css";

function ShippingAddress() {
  const city = useField("text");
  const { onReset: resetCity, ...cityProps } = city;
  const state = useField("text");
  const { onReset: resetState, ...stateProps } = state;
  const country = useField("text");
  const { onReset: resetCountry, ...countryProps } = country;

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputContainer}>
            <p>City</p>
            <Input placeholder="Enter your city" size="small" {...cityProps} />
          </div>
          <div className={styles.inputContainer}>
            <p>State/Province/Region</p>
            <Input
              placeholder="Enter state, province or region"
              size="small"
              {...stateProps}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Country</p>
            <Input
              placeholder="Enter your country"
              size="small"
              {...countryProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
