import styles from "./Breadcrumb.module.css";

function Breadcrumb({ link = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbWrapper}>
      <ol className={styles.linksWrapper}>
        <li className={styles.linkItem}>
          <a href="/artworks">All works</a>
        </li>
        <span className={styles.linksDivider}>/</span>
        <li className={styles.linkItem}>
          <span aria-current="page">{link}</span>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
