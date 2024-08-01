import { useState } from "react";
import Button from "../../ui/Button";
import CheckboxComponent from "../../ui/CheckboxComponent";
import styles from "./DetailedList.module.css";
import Modal from "../modal/Modal";
import ConfirmDelete from "../messages/ConfirmDelete";
import formatCurrency from "../../helpers/formatCurrency";

function DetailedList({ isAllChecked = false, artwork }) {
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
            <img src={artwork.images[0]} alt="" className={styles.itemImage} />
          </div>
          <div className={styles.itemDetails}>
            <div className={styles.itemTitle}>{artwork.title}</div>
            <div className={styles.itemCategory}>{artwork.medium}</div>
            <div
              className={styles.itemSize}
            >{`${artwork.dimensions.width} W x ${artwork.dimensions.height} H x ${artwork.dimensions.depth} D in`}</div>
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
                    <ConfirmDelete message="Are you sure you want to delete this artwork?" />
                  </Modal.Window>
                </Modal>
              </div>
            )}
          </div>
        </div>
        <div className={styles.itemInfosContainer}>Published</div>
        <div className={styles.itemInfosContainer}>{artwork.published}</div>
        <div className={styles.itemInfosContainer}>
          {formatCurrency(artwork.price)}
        </div>
        <div className={styles.itemInfosContainer}>{artwork.availability}</div>
      </div>
    </li>
  );
}

export default DetailedList;
