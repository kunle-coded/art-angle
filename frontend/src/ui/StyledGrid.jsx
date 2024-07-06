import { useState } from "react";
import Input from "./Input";
import styles from "./StyledGrid.module.css";

function StyledGrid({
  title = "",
  isSingle = false,
  gridList = [],
  isEdit,
  children,
}) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className={styles.contentGrid}>
      <div className={styles.gridItemLeft}>
        <div className={styles.titleWrapper}>{title}</div>
      </div>
      <div className={styles.gridItemRight}>
        {isSingle ? (
          <div className={styles.singleRow}>
            {children ? (
              <div className={styles.childrenContainer}>{children}</div>
            ) : (
              <div className={styles.singleContent}>Single item</div>
            )}
          </div>
        ) : (
          gridList.map((gridItem) => (
            <div key={gridItem.id} className={styles.gridInnerContainer}>
              <div className={styles.gridItemLeft}>
                <div className={styles.gridLabel}>{gridItem.label}</div>
              </div>
              <div className={styles.gridInnerRight}>
                {isEdit ? (
                  <Input
                    size="small"
                    value={inputValue ? inputValue : gridItem.value}
                    onChange={handleInput}
                  />
                ) : (
                  <div className={styles.gridLabel}>{gridItem.value}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StyledGrid;
