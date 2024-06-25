import { useState } from "react";
import Button from "../../ui/Button";
import CheckboxComponent from "../../ui/CheckboxComponent";
import styles from "./DetailedList.module.css";
import Modal from "../modal/Modal";
import ConfirmDelete from "../messages/ConfirmDelete";

function DetailedList({ isAllChecked = false }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked((prevState) => !prevState);
  }

  function handleCancel() {
    setIsChecked(false);
  }

  return (
    <li className="container">
      <div
        className={`${styles.itemWrapper} ${
          isChecked || isAllChecked ? styles.activeItem : ""
        }`}
      >
        <div className={styles.checkboxContainer}>
          <CheckboxComponent
            isChecked={isChecked || isAllChecked}
            onCheck={handleCheck}
          />
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
                <Button size="smallest" type="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Modal>
                  <Modal.Open opens="confirm_delete">
                    <Button size="smallest" type="error">
                      Delete
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="confirm_delete">
                    <ConfirmDelete />
                  </Modal.Window>
                </Modal>
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
