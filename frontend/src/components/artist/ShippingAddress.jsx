import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import Input from "../../ui/Input";
import styles from "./ShippingAddress.module.css";
import { updateAddress } from "../../reducers/artworkSllice";
import StyledSelect from "../../ui/StyledSelect";
import { countries } from "../../data";

function ShippingAddress() {
  const city = useField("text");
  const { onReset: resetCity, ...cityProps } = city;
  const state = useField("text");
  const { onReset: resetState, ...stateProps } = state;

  const dispatch = useDispatch();

  function handleCountrySelect(_, option) {
    if (!city.value && !state.value) return;
    const address = {
      city: city.value,
      state: state.value,
      country: option,
    };
    dispatch(updateAddress(address));
  }

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
            <StyledSelect
              placeholder="Enter your country"
              size="small"
              options={countries}
              onSelect={handleCountrySelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
