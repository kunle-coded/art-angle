import { useState } from "react";
import Input from "./Input";
import styles from "./StyledGrid.module.css";
import StyledTextArea from "./StyledTextArea";
import formatCurrency from "../helpers/formatCurrency";

function StyledGrid({
  title = "",
  isSingle = false,
  gridList = [],
  singleValue = "",
  isEdit,
  isTextArea = false,
  isNumber = false,
  children,
}) {
  const [inputValues, setInputValues] = useState(
    gridList.map((item) => item.value)
  );

  const [singleInput, setSingleInput] = useState(singleValue);

  const handleInputChange = (index, event) => {
    const newValues = [...inputValues];
    newValues[index] = event.target.value;
    setInputValues(newValues);
  };

  function handleSingleInput(e) {
    setSingleInput(e.target.value);
  }

  return (
    <div className={styles.contentGrid}>
      <div className={styles.gridItemLeft}>
        <div className={styles.titleWrapper}>{title}</div>
      </div>
      <div className={styles.gridItemRight}>
        {isSingle ? (
          <div className={styles.singleRow}>
            {isEdit ? (
              isTextArea ? (
                <StyledTextArea
                  value={singleInput}
                  onChange={handleSingleInput}
                />
              ) : (
                <Input
                  size="small"
                  value={singleInput}
                  onChange={handleSingleInput}
                />
              )
            ) : (
              <div className={styles.childrenContainer}>{children}</div>
            )}
          </div>
        ) : (
          gridList.map((gridItem, index) => (
            <div key={gridItem.id} className={styles.gridInnerContainer}>
              <div className={styles.gridItemLeft}>
                <div className={styles.gridLabel}>{gridItem.label}</div>
              </div>
              <div className={styles.gridInnerRight}>
                {isEdit && gridItem.label !== "Shipping Cost" ? (
                  <Input
                    size="small"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                ) : (
                  <div className={styles.gridLabel}>
                    {isNumber ? formatCurrency(gridItem.value) : gridItem.value}
                  </div>
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
