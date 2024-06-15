import { useState } from "react";
import styles from "./FormInput.module.css";

function Input({
  placeholder = "",
  label = "",
  onHidePassword,
  children,
  ...props
}) {
  const translateY = `translateY(${-150}%)`;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputField}>
          <input
            name={props.type}
            title={props.type}
            placeholder={placeholder}
            autoComplete={
              props.type === "password"
                ? "new-password"
                : props.type === "text"
                ? ""
                : props.type
            }
            className={styles.searchInput}
            style={{ paddingRight: "33px" }}
            {...props}
          />
          <label
            htmlFor={props.type}
            className={styles.inputLabel}
            style={
              props.value
                ? {
                    transform: translateY,
                    undefined,
                    fontSize: "13px",
                    padding: "0px 5px",
                  }
                : undefined
            }
          >
            {label}
            <span></span>
          </label>
        </div>
        {children && (
          <div className={styles.labelContainer}>
            <button className={styles.labelButton} onClick={onHidePassword}>
              <div className={styles.label}>{children}</div>
            </button>
          </div>
        )}
      </div>
      {props.type === "password" && (
        <div className={styles.passwordOption}>
          Password must be at least 8 characters and include a lowercase
          letter,uppercase letter, and digit.
        </div>
      )}
    </div>
  );
}

export default Input;
