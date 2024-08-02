import { useState } from "react";
import styles from "./LabeledInput.module.css";

function LabeledInput({
  placeholder = "",
  label = "",
  display = false,
  displayText = "",
  onHidePassword,
  onInput,
  autoComplete = "",
  children,
  ...props
}) {
  const [inputValue, setInputValue] = useState(displayText);

  function handleChange(e) {
    setInputValue(e.target.value);
    onInput(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputField}>
          <label htmlFor={label} className={styles.inputLabel}>
            {label}
          </label>
          {display ? (
            <p className={styles.displayText}>{displayText}</p>
          ) : displayText ? (
            <input
              id={label}
              title={label}
              placeholder={placeholder}
              className={styles.input}
              value={inputValue}
              onChange={handleChange}
            />
          ) : (
            <input
              id={label}
              title={label}
              placeholder={placeholder}
              className={styles.input}
              autoComplete={autoComplete}
              value={inputValue}
              onChange={handleChange}
              {...props}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LabeledInput;
