import { useEffect, useState } from "react";
import styles from "./StyledSelect.module.css";
import CloseIcon from "../components/icons/CloseIcon";
import StyledTextArea from "./StyledTextArea";
import { useField } from "../hooks";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { deleteMediumItem } from "../slices/artworkSlice";

function StyledSelect({
  label = "",
  placeholder = "",
  note = "",
  info = "",
  size = "",
  tips = [],
  options = [],
  isMultiple = false,
  isInput = false,
  isTextArea = false,
  isNoLabel = false,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const [selectedMultiple, setSelectedMultiple] = useState([placeholder]);

  const inputValue = useField("text");
  const { onReset, ...inputProps } = inputValue;
  const textAreaValue = useField("text");
  const { onReset: resetTextArea, ...textAreaProps } = textAreaValue;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isSelect = e.target.name === "select_button";
      if (isSelect) {
        return;
      } else {
        setIsOpen(false);
      }
    };

    document
      .querySelector("body")
      .addEventListener("click", handleClickOutside);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleOpen() {
    setIsOpen((prevState) => !prevState);
  }

  function handleSelection(option) {
    const isSelected = selectedMultiple.find((item) => item === option);

    if (isMultiple) {
      if (isSelected) {
        setIsOpen(false);
        return;
      }

      setSelectedMultiple((prevSelected) => [...prevSelected, option]);

      onSelect(label, option);
    } else {
      setSelected(option);
      onSelect(label, option);
    }
    setIsOpen(false);
  }

  function deleteSelection(item) {
    setSelectedMultiple((prevItems) =>
      prevItems.filter((itemToDel) => itemToDel !== item)
    );

    dispatch(deleteMediumItem(item));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setSelectedMultiple((prevSelected) => [
        ...prevSelected,
        inputValue.value,
      ]);
      onSelect(label, inputValue.value);
      onReset(event);
    }
  }

  function handleTextArea(e) {
    onSelect(label, textAreaValue.value);
    resetTextArea(e);
  }

  return (
    <div className={`${styles.container} ${!label ? styles.fullWidth : ""}`}>
      {label && !isNoLabel && (
        <div className={styles.displayLabel}>{label}</div>
      )}
      {note && <div className={styles.displayNote}>{note}</div>}
      {info && <div className={styles.displayInfo}>{info}</div>}
      {note &&
        isTextArea &&
        tips &&
        tips.map((tip, i) => (
          <div key={i} className={styles.displayInfoList}>
            {tip}
          </div>
        ))}
      {!isInput && !isTextArea && (
        <label htmlFor="select button" className={styles.label}>
          {label}
        </label>
      )}
      {!isInput && !isTextArea && (
        <div className={styles.selectContainer}>
          <button
            name="select_button"
            className={`${styles.select} ${
              size === "small" ? styles.small : ""
            }`}
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
      )}

      {isInput && (
        <input
          type="text"
          placeholder={placeholder}
          className={styles.customInput}
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
      )}
      {note && isMultiple && (
        <div className={styles.displayCount}>
          {selectedMultiple.length - 1}/12
        </div>
      )}

      {isTextArea && (
        <StyledTextArea placeholder={placeholder} {...textAreaProps} />
      )}
      {isTextArea && (
        <div className={styles.descBtn}>
          <Button size="small" onClick={handleTextArea}>
            Submit
          </Button>
        </div>
      )}

      {isOpen && !isInput && !isTextArea && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, i) => (
            <li
              key={i}
              className={`${styles.menuOption} ${
                selected === option || selectedMultiple.includes(option)
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
                  <div
                    className={styles.closeSelected}
                    onClick={() => deleteSelection(selectedItem)}
                  >
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
