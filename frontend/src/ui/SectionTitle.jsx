import styles from "./SectionTitle.module.css";
import { Link } from "react-router-dom";

function SectionTitle({ title, subtitle, link }) {
  return (
    <div className="container">
      <div className={styles.titleWrapper}>
        <div className={styles.sectionTitle}>{title}</div>
        {subtitle && (
          <div className={styles.subtitleWrapper}>
            <Link to={link} className={styles.sectionSubtitle}>
              {subtitle}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionTitle;
