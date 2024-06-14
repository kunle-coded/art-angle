import styles from "./Onboarding.module.css";
import LogoIcon from "../icons/LogoIcon";

function Onboarding({ children }) {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <div className={styles.logoInner}>
            <LogoIcon />
          </div>
          <div className={styles.logoText}>Art Angle</div>
        </div>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  );
}

export default Onboarding;
