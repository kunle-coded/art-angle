import { useState } from "react";
import styles from "./DetailedListComponent.module.css";
import CheckboxComponent from "../../ui/CheckboxComponent";

function DetailedListComponent({ children }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        <div className={styles.listHeader}>
          <CheckboxComponent isChecked={isChecked} onCheck={handleCheck} />
          <div className={styles.itemTitle}>Artworks</div>
          <div className={styles.itemDetail}>Visibility</div>
          <div className={styles.itemDetail}>Date</div>
          <div className={styles.itemDetail}>Price</div>
          <div className={styles.itemDetail}>Original</div>
        </div>

        <ul className={styles.lists}>{children}</ul>
      </div>
    </div>
  );
}

export default DetailedListComponent;
