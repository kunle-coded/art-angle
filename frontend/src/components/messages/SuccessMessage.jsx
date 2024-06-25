import { useDispatch, useSelector } from "react-redux";
import { disableSuccess, getGlobal } from "../../reducers/globalSlice";
import styles from "./SuccessMessage.module.css";
import { useEffect } from "react";

function SuccessMessage() {
  const { isSuccess } = useSelector(getGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        dispatch(disableSuccess());
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [dispatch, isSuccess]);

  return (
    <div className={`${styles.msgContainer} ${isSuccess ? styles.show : ""}`}>
      <div
        className={`${styles.msgWrapper} ${isSuccess ? styles.showMsg : ""}`}
      >
        <div className={styles.msg}>
          <p>Nostalgic Beauty</p>
          <p>Successfully deleted</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
