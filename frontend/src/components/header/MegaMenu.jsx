import styles from "./MegaMenu.module.css";

function MegaMenu({ isShow }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className={`${styles.megaMenu} ${isShow ? styles.showMega : ""}`}>
        <div
          className={`${styles.dropdown} ${isShow ? styles.showDropdown : ""}`}
        >
          <div className={styles.dropdownOuter}>
            <div className={styles.dropdownInner}>
              <div className={styles.menuContainer}>
                <div className={styles.menuInner}>
                  <div className={styles.menuWrapper}>
                    <div className={styles.menu}>Menu 1</div>
                    <div className={styles.menu}>Menu 2</div>
                    <div className={styles.menu}>Menu 3</div>
                    <div className={styles.menu}>Menu 4</div>
                  </div>
                  <div className={styles.menuFooter}>Footer here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
