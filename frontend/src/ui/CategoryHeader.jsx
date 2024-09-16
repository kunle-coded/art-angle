import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";
import PageTitle from "./PageTitle";

function CategoryHeader({ title = "", subtitle = "" }) {
  return (
    <header className="container">
      <div className={styles.headerWrapper}>
        <div>
          <div className={styles.headingWrapper}>
            <PageTitle title={title} />
          </div>
          <nav className={styles.breadcrumbWrapper}>
            <ol>
              <li></li>
              <span>/</span>
              <li></li>
            </ol>
          </nav>
        </div>

        <div className={styles.subheadingWrapper}>
          <div className={styles.subheading}>{subtitle}</div>
        </div>
      </div>
    </header>
  );
}

export default CategoryHeader;
