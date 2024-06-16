import { forwardRef } from "react";

import styles from "./Onboarding.module.css";
import LogoIcon from "../icons/LogoIcon";
import CloseIcon from "../icons/CloseIcon";

function Onboarding(props, ref) {
  const isIntersecting = props.isIntersecting;
  const closeModal = props.closeModal;

  return (
    <div
      ref={ref}
      className={styles.header}
      style={
        isIntersecting
          ? {
              transition: "box-shadow 250ms ease 0s",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 0px",
            }
          : {}
      }
    >
      <div className={styles.headerInner}>
        <div className={styles.introContainer}>
          <div className={styles.logoContainer}>
            <div className={styles.logoInner}>
              <LogoIcon />
            </div>
            <div className={styles.logoText}>Art Angle</div>
          </div>
          <div className={styles.introText}>{props.introText}</div>
        </div>

        <button className={styles.closeBtn} onClick={() => closeModal?.()}>
          <div className={styles.close}>
            <CloseIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default forwardRef(Onboarding);
