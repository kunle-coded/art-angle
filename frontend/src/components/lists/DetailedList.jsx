import { useState } from "react";
import Button from "../../ui/Button";
import CheckboxComponent from "../../ui/CheckboxComponent";
import styles from "./DetailedList.module.css";

function DetailedList() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked((prevState) => !prevState);
  }
  return (
    <li className="container">
      <div
        className={`${styles.itemWrapper} ${
          isChecked ? styles.activeItem : ""
        }`}
      >
        <div className={styles.checkboxContainer}>
          <CheckboxComponent isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div className={styles.itemDetailsContainer}>
          <div className={styles.itemImageContainer}>
            <img
              src="../../sliderImg1.png"
              alt=""
              className={styles.itemImage}
            />
          </div>
          <div className={styles.itemDetails}>
            <div className={styles.itemTitle}>Nostalgic Beauty</div>
            <div className={styles.itemCategory}>Painting</div>
            <div className={styles.itemSize}>18 W x 10 H x 1 D in</div>
            {isChecked && (
              <div className={styles.itemDetailsButtons}>
                <Button size="smallest" type="secondary">
                  Cancel
                </Button>
                <Button size="smallest" type="error">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.itemInfosContainer}>Published</div>
        <div className={styles.itemInfosContainer}>April 23, 2022</div>
        <div className={styles.itemInfosContainer}>N1,450,500</div>
        <div className={styles.itemInfosContainer}>For Sale</div>
      </div>
    </li>
  );
}

export default DetailedList;
