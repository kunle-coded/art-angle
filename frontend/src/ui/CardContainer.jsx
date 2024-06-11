import styles from "./CardContainer.module.css";

function CardContainer({ children }) {
  return (
    <div className={styles.cardContainer}>
      <ul className={styles.cardList}>{children}</ul>
    </div>
  );
}

export default CardContainer;
