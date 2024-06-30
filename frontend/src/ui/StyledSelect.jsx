import { useState } from "react";
import styles from "./StyledSelect.module.css";
import CloseIcon from "../components/icons/CloseIcon";

function StyledSelect({
  label = "",
  placeholder = "",
  options = [],
  isMultiple = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const [selectedMultiple, setSelectedMultiple] = useState([placeholder]);

  function toggleOpen() {
    setIsOpen((prevState) => !prevState);
  }

  function handleSelection(option) {
    const isSelected = selectedMultiple.find((item) => item === option);
    console.log(isSelected);
    if (isMultiple) {
      if (isSelected) {
        setIsOpen(false);
        return;
      }

      setSelectedMultiple((prevSelected) => [...prevSelected, option]);
    } else {
      setSelected(option);
    }
    setIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.displayLabel}>{label}</div>
      <label htmlFor="" className={styles.label}>
        {label}
      </label>
      <div className={styles.selectContainer}>
        <button
          name="select button"
          className={styles.select}
          onClick={toggleOpen}
        >
          {selected}
        </button>
        <div className={styles.selectArrow}>
          <div className={styles.selectIcon}>
            <svg
              viewBox="0 0 18 18"
              fill="currentColor"
              style={{
                position: "absolute",
                inset: "0px",
                width: "100%",
                height: "100%",
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, i) => (
            <li
              key={i}
              className={`${styles.menuOption} ${
                selected === option || selectedMultiple[i + 1] === option
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleSelection(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {isMultiple && selectedMultiple.length > 1 && (
        <ul className={styles.selectedItems}>
          {selectedMultiple.map(
            (selectedItem, i) =>
              i >= 1 && (
                <li key={i} className={styles.selectedItem}>
                  <span>{selectedItem}</span>
                  <div className={styles.closeSelected}>
                    <CloseIcon />
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}

export default StyledSelect;
