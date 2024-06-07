import { useEffect } from "react";
import FocusComponent from "../../ui/FocusComponent";
import styles from "./FilterModal.module.css";

function FilterModal({ children, isShowModal, onCloseModal }) {
  const transformX = `translateX(${isShowModal ? 0 : -110}%)`;

  useEffect(() => {
    if (isShowModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isShowModal]);

  return (
    <div
      className={`${styles.modalContainer} ${
        isShowModal ? styles.openModal : ""
      }`}
      onClick={onCloseModal}
    >
      <FocusComponent isFocus={isShowModal} />
      <div
        data-focus-lock-disabled={isShowModal ? "false" : "disabled"}
        className={styles.modalFocus}
      >
        <div
          className={styles.modal}
          style={{ transform: transformX }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      <FocusComponent isFocus={isShowModal} />
      <div
        className={`${styles.overlay} ${isShowModal ? styles.show : ""}`}
        {...(isShowModal
          ? { "aria-hidden": "true", "data-focus-on-hidden": "true" }
          : {})}
      ></div>
    </div>
  );
}

export default FilterModal;
