import styles from "./ArtworkAvailability.module.css";
import { Availability, Editions } from "../../constants/enums";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateAvailability,
  updateEditions,
} from "../../reducers/artworkSllice";

function ArtworkAvailability({ title = "", type = "", setEditions }) {
  const [inputValue, setInputValue] = useState(
    type === "editions" ? Editions.LIMITED : Availability.FOR_SALE
  );

  const dispatch = useDispatch();

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);

    if (type === "editions") {
      if (value === "Limited Edition") {
        setEditions(true);
      } else {
        setEditions(false);
      }
      dispatch(updateEditions(value));
    } else {
      dispatch(updateAvailability(value));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.radioInputList}>
          <div className={styles.inputItem}>
            <input
              type="radio"
              name={type === "editions" ? "editions" : "availability"}
              id={type === "editions" ? "limited_edition" : "for_sale"}
              value={
                type === "editions" ? Editions.LIMITED : Availability.FOR_SALE
              }
              checked={
                type === "editions"
                  ? inputValue === Editions.LIMITED
                  : inputValue === Availability.FOR_SALE
              }
              aria-checked={
                type === "editions"
                  ? inputValue === Editions.LIMITED
                  : inputValue === Availability.FOR_SALE
              }
              onChange={handleChange}
              className={styles.input}
            />
            <label
              htmlFor={type === "editions" ? "limited_edition" : "for_sale"}
            >
              {type === "editions" ? Editions.LIMITED : Availability.FOR_SALE}
            </label>
          </div>
          <div className={styles.inputItem}>
            <input
              type="radio"
              name={type === "editions" ? "editions" : "availability"}
              id={type === "editions" ? "one_of_a_kind" : "not_for_sale"}
              value={
                type === "editions" ? Editions.ONE : Availability.NOT_FOR_SALE
              }
              checked={
                type === "editions"
                  ? inputValue === Editions.ONE
                  : inputValue === Availability.NOT_FOR_SALE
              }
              aria-checked={
                type === "editions"
                  ? inputValue === Editions.ONE
                  : inputValue === Availability.NOT_FOR_SALE
              }
              onChange={handleChange}
              className={styles.input}
            />
            <label
              htmlFor={type === "editions" ? "one_of_a_kind" : "not_for_sale"}
            >
              {type === "editions" ? Editions.ONE : Availability.NOT_FOR_SALE}
            </label>
          </div>
          {type !== "editions" && (
            <div className={styles.inputItem}>
              <input
                type="radio"
                name="availability"
                id="sold"
                value={Availability.SOLD}
                checked={inputValue === Availability.SOLD}
                aria-checked={inputValue === Availability.SOLD}
                onChange={handleChange}
                className={styles.input}
              />
              <label htmlFor="sold">{Availability.SOLD}</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworkAvailability;
