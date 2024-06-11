import styles from "./SellingPoints.module.css";

function SellingPoints({ children }) {
  return (
    <section className="section_block">
      <div className={styles.container}>
        <div className={styles.gridContainer}>{children}</div>
      </div>
    </section>
  );
}

export default SellingPoints;
