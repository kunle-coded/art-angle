import styles from "./MegaMenu.module.css";

function MegaMenu({ isShow, isEnter, onEnter, onLeave, children }) {
  return (
    <div
      className={styles.megaMenuContainer}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
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
