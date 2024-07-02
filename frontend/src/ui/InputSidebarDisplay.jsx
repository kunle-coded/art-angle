import styles from "./InputSidebarDisplay.module.css";

function InputSidebarDisplay({ item, label = "" }) {
  return (
    <div className={styles.inputData}>
      <h5>{label}</h5>
      <p>{item}</p>
    </div>
  );
}

export default InputSidebarDisplay;
