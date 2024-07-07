import { useState } from "react";
import styles from "./CartList.module.css";
import Modal from "../modal/Modal";
import ConfirmDelete from "../messages/ConfirmDelete";
import TrashIcon from "../icons/TrashIcon";

function CartList() {
  return (
    <li className="container">
      <div className={styles.itemWrapper}>
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
            <div className={styles.itemArtist}>Durodola Yusuf</div>
            <div className={styles.itemCategory}>Painting</div>
            <div className={styles.innerContainer}>
              <p>Shipping</p>
              <p>Included</p>
            </div>
            <div className={styles.innerPriceContainer}>
              <p>Artwork Total</p>
              <p>₦108,000</p>
            </div>
          </div>
          <div className={styles.itemDeleteButton}>
            <Modal>
              <Modal.Open opens="confirm_delete">
                <div className={styles.deleteIcon}>
                  <TrashIcon />
                </div>
              </Modal.Open>
              <Modal.Window name="confirm_delete">
                <ConfirmDelete message="Are you sure you want to delete this item from cart?" />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartList;
