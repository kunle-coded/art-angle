import { Link } from "react-router-dom";
import styles from "./FooterColumn.module.css";

function FooterColumn({ title, list = [] }) {
  const formatText = (text) => {
    const formatted = text.split(" ").join("-").toLowerCase();
    return formatted;
  };

  return (
    <div className={styles.footerColumn}>
      <div className={styles.columnContainer}>
        <div className={styles.columnTitle}>{title}</div>
        <ul className={styles.columnList}>
          {list.map((item, index) => (
            <li className={styles.listItem} key={index}>
              <Link to={`/${formatText(item)}`} className={styles.itemLink}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FooterColumn;
