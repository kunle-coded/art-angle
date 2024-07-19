import styles from "./EmptyList.module.css";

function EmptyList() {
  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.contentContainer}>
          <p>You haven't placed an offer yet.</p>
        </div>
      </div>
    </div>
  );
}

export default EmptyList;
