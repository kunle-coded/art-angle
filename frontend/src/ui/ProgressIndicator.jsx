import styles from "./ProgressIndicator.module.css";

function ProgressIndicator({
  number = "",
  text = "",
  current = false,
  last = false,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div
          className={`${styles.stepNumber} ${
            current ? styles.currentStep : ""
          } ${last ? styles.lastItem : ""}`}
        >
          {number}
        </div>
        <div
          className={`${styles.stepText} ${
            current ? styles.currentStepText : ""
          }`}
        >
          {text}
        </div>
      </div>
      <div className={styles.innerWrap}></div>
    </div>
  );
}

export default ProgressIndicator;
