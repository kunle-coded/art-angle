import { useState } from "react";
import styles from "./FormInput.module.css";

function FormInput({
  placeholder = "",
  label = "",
  passwordInfo = true,
  onHidePassword,
  size = "",
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
                : undefined
            }
            className={`${styles.searchInput} ${
              size === "small" ? styles.small : ""
            }`}
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
      {label === "Password" && passwordInfo && (
        <div className={styles.passwordOption}>
          Password must be at least 8 characters and include a lowercase
          letter,uppercase letter, and digit.
        </div>
      )}
    </div>
  );
}

export default FormInput;
