import styles from "./StyledTextArea.module.css";

function StyledTextArea({ placeholder = "", label = "", ...props }) {
  const translateY = `translateY(${-150}%)`;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputField}>
          <textarea
            name=""
            id=""
            title={props.type}
            placeholder={placeholder}
            className={styles.searchInput}
            {...props}
          ></textarea>
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
      </div>
    </div>
  );
}

export default StyledTextArea;
