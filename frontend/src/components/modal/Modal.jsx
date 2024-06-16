import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import FocusComponent from "../../ui/FocusComponent";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };

  const open = useCallback((name) => setOpenName(name), []);

  useEffect(() => {
    if (openName !== "") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openName]);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close, open } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <FocusComponent isFocus={name === openName} />
      <div className={styles.modalBase}>
        <div className={styles.modalBaseBackdrop}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              className={`${styles.contentContainer} ${styles.contentContnr}`}
            >
              {cloneElement(children, {
                onCloseModal: close,
                onOpenModal: open,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
