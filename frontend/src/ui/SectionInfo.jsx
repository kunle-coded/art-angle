import styles from "./SectionInfo.module.css";

function SectionInfo({ info }) {
  return <div className={styles.text}>{info}</div>;
}

export default SectionInfo;
