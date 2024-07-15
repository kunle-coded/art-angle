import { useDispatch } from "react-redux";
import { enableSuccess, updateSuccessMgs } from "../../slices/globalSlice";

import Button from "../../ui/Button";
import styles from "./ConfirmDelete.module.css";

function ConfirmDelete({ onCloseModal, message = "", successMsg = "" }) {
  const dispatch = useDispatch();

  function handleConfirm() {
    dispatch(enableSuccess());
    dispatch(updateSuccessMgs(successMsg));
    onCloseModal?.();
  }

  function handleCancel() {
    onCloseModal?.();
  }

  return (
    <div className={styles.container}>
      <div className={styles.msgWrapper}>
        <div className={styles.msg}>
          {message} If you choose DELETE, this action can not be reversed.
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
