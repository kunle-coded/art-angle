import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";

function PageHeader({ title, subtitle, link }) {
  return (
    <div className="container">
      <div className={styles.titleWrapper}>
        <div className={styles.heading}>{title}</div>
        {subtitle && (
          <div className={styles.subheadingWrapper}>
            <Link to={link} className={styles.subheading}>
              {subtitle}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
