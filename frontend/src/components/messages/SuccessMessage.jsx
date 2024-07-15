import { useDispatch, useSelector } from "react-redux";
import {
  disableError,
  disableSuccess,
  getGlobal,
} from "../../slices/globalSlice";
import styles from "./SuccessMessage.module.css";
import { useEffect, useState } from "react";

function SuccessMessage() {
  const [counter, setCounter] = useState(100);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isSuccess, isError, successMessage } = useSelector(getGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    if (isSuccess || isError) {
      if (!isInitialized) {
        setCounter(100);
        setIsInitialized(true);
      }

      intervalId = setInterval(() => {
        setCounter((count) => {
          if (count > 0) {
            return count - 10;
          } else {
            clearInterval(intervalId);
            dispatch(disableSuccess());
            dispatch(disableError());
            return 0;
          }
        });
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isSuccess, isError, dispatch, counter, isInitialized]);

  useEffect(() => {
    if (!isSuccess && !isError) {
      setIsInitialized(false);
    }
  }, [isSuccess, isError]);

  return (
    <div
      className={`${styles.msgContainer} ${
        isSuccess || isError ? styles.show : ""
      } `}
    >
      <div
        className={`${styles.msgWrapper} ${
          isSuccess || isError ? styles.showMsg : ""
        } ${isError ? styles.error : ""}`}
      >
        <div className={`${styles.msg} ${isError ? styles.errorMsg : ""}`}>
          <p>{successMessage}</p>
          {/* <p>Successfully deleted</p> */}
        </div>
        {(isSuccess || isError) && (
          <div
            className={`${styles.loader} ${isError ? styles.errorLoader : ""}`}
            style={{ width: `${counter}%`, transition: "width 500ms linear" }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default SuccessMessage;
