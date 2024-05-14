import { useState } from "react";
import styles from "./MegaMenu.module.css";

function MegaMenu({ isShow, children }) {
  const [isEnter, setIsEnter] = useState(false);

  return (
    <div
      style={{ position: "relative", zIndex: 1 }}
      onMouseEnter={() => setIsEnter(true)}
      onMouseLeave={() => setIsEnter(false)}
    >
      <div
        className={`${styles.megaMenu} ${
          isShow || isEnter ? styles.showMega : ""
        }`}
      >
        <div
          className={`${styles.dropdown} ${
            isShow || isEnter ? styles.showDropdown : ""
          }`}
        >
          <div className={styles.dropdownOuter}>
            <div className={styles.dropdownInner}>
              <div className={styles.menuContainer}>
                <div className={styles.menuInner}>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
