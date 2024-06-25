// import { useState } from "react";
import styles from "./DetailedListComponent.module.css";
import CheckboxComponent from "../../ui/CheckboxComponent";
import Button from "../../ui/Button";

function DetailedListComponent({
  children,
  type = "",
  isChecked,
  onCheck,
  onDelete,
  onCancel,
}) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        <div
          className={`${styles.listHeader} ${isChecked ? styles.expand : ""}`}
        >
          <CheckboxComponent isChecked={isChecked} onCheck={onCheck} />
          <div className={styles.itemTitle}>Artworks</div>
          <div className={styles.itemDetail}>Visibility</div>
          <div className={styles.itemDetail}>Date</div>
          <div className={styles.itemDetail}>Price</div>
          <div className={styles.itemDetail}>Original</div>

          {isChecked && (
            <div className={styles.itemButtons}>
              <Button size="smallest" type="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="smallest" type="error" onClick={onDelete}>
                Delete All
              </Button>
            </div>
          )}
        </div>

        <ul className={styles.lists}>{children}</ul>
      </div>
    </div>
  );
}

export default DetailedListComponent;
