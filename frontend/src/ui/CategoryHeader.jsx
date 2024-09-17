import styles from "./CategoryHeader.module.css";
import Breadcrumb from "./Breadcrumb";

function CategoryHeader({ categoryMeta, breadcumbLink }) {
  return (
    <div className={styles.container}>
      <header className={styles.gridContainer}>
        <div className={styles.gridColumn}>
          <div className={styles.headingWrapper}>
            <h1 fontFamily="sans" className={styles.heading}>
              {categoryMeta?.category}
            </h1>
          </div>
          <Breadcrumb link={breadcumbLink} />
        </div>

        <div className={styles.gridColumn}>
          <div className={styles.subheadingContainer}>
            <span>
              <p>{categoryMeta?.desc}</p>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default CategoryHeader;
