import styles from "./ListItems.module.css";

function ListItems({ children }) {
  return (
    <div className={styles.listContainer}>
      <ul className={styles.lists}>{children}</ul>
    </div>
  );
}

export default ListItems;
