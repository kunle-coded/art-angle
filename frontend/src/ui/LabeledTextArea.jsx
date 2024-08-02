import { useEffect, useRef, useState } from "react";
import styles from "./LabeledTextArea.module.css";

function LabeledTextArea({
  placeholder = "",
  label = "",
  display = false,
  displayText = "",
  onHidePassword,
  onInput,
  children,
  ...props
}) {
  const [inputValue, setInputValue] = useState(displayText);
  const [elHeight, setElHeight] = useState(0);

  const textAreaRef = useRef(null);

  function handleChange(e) {
    setInputValue(e.target.value);
    onInput(e.target.value);
  }

  useEffect(() => {
    const height = textAreaRef.current?.scrollHeight;
    setElHeight(height);
  }, []);

  const textAreaStyle = `${elHeight}px`;

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
            <textarea
              ref={textAreaRef}
              id={label}
              title={label}
              className={styles.textArea}
              value={inputValue}
              onChange={handleChange}
              style={{ height: textAreaStyle }}
            ></textarea>
          ) : (
            <textarea
              ref={textAreaRef}
              id={label}
              title={label}
              className={styles.textArea}
              style={{ height: textAreaStyle }}
              {...props}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
}

export default LabeledTextArea;
