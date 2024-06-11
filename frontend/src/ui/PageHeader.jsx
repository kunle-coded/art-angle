import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";
import PageTitle from "./PageTitle";

function PageHeader({ title, subtitle, link }) {
  return (
    <div className="container">
      <div className={styles.titleWrapper}>
        <PageTitle title={title} />
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
