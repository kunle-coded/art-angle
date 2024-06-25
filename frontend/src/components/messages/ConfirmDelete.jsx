import { useDispatch } from "react-redux";
import { enableSuccess } from "../../reducers/globalSlice";

import Button from "../../ui/Button";
import styles from "./ConfirmDelete.module.css";

function ConfirmDelete({ onCloseModal }) {
  const dispatch = useDispatch();

  function handleConfirm() {
    dispatch(enableSuccess());
    onCloseModal?.();
  }

  function handleCancel() {
    console.log("You chose to cancel");
    onCloseModal?.();
  }

  return (
    <div className={styles.container}>
      <div className={styles.msgWrapper}>
        <div className={styles.msg}>
          Are you sure you want to delete this artwork? If you choose DELETE,
          this action can not be reversed.
        </div>
        <div className={styles.btnWrapper}>
          <Button type="secondary" size="small" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="error" size="small" onClick={handleConfirm}>
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
