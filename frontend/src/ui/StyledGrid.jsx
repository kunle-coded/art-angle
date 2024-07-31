import { useState } from "react";
import Input from "./Input";
import styles from "./StyledGrid.module.css";
import StyledTextArea from "./StyledTextArea";
import formatCurrency from "../helpers/formatCurrency";
import StyledSelect from "./StyledSelect";
import DimensionsInput from "./DimensionsInput";

function StyledGrid({
  title = "",
  isSingle = false,
  gridList = [],
  selectList = [],
  singleValue = "",
  selectPlaceholder = "",
  dimensions,
  isEdit,
  isTextArea = false,
  isSelect = false,
  isMultiple = false,
  isNumber = false,
  isDimensions = false,
  onEdit,
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

  function handleDimensions(label, data) {
    const dataObj = {};
    dataObj[label.toLowerCase()] = data;
    onEdit(dataObj);
  }

  function handleSelect(label, selected) {
    let modifiedLabel;

    modifiedLabel = label === "Year" ? "Published" : label;
    const dataObj = {};
    dataObj[modifiedLabel.toLowerCase()] = selected;
    onEdit(dataObj);
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
              isSelect ? (
                <StyledSelect
                  placeholder={selectPlaceholder}
                  options={selectList}
                  onSelect={handleSelect}
                  isMultiple={isMultiple}
                />
              ) : isTextArea ? (
                <StyledTextArea
                  value={singleInput}
                  onChange={handleSingleInput}
                />
              ) : isDimensions ? (
                <DimensionsInput
                  showDiagram={false}
                  onInput={handleDimensions}
                  dimesions={dimensions}
                />
              ) : (
                <Input
                  size="small"
                  value={singleInput}
                  onChange={handleSingleInput}
                />
              )
            ) : (
              <div className={styles.childrenContainer}>{singleInput}</div>
            )}
          </div>
        ) : (
          gridList.map((gridItem, index) => (
            <div key={gridItem.id} className={styles.gridInnerContainer}>
              <div className={styles.gridItemLeft}>
                <div className={styles.gridLabel}>{gridItem.label}</div>
              </div>
              <div className={styles.gridInnerRight}>
                {isEdit && gridItem.editable ? (
                  isSelect && gridItem.options ? (
                    <StyledSelect
                      label={gridItem.label}
                      placeholder={gridItem.placeholder}
                      options={gridItem.options}
                      isNoLabel
                      isMultiple={gridItem.multiple}
                      onSelect={handleSelect}
                    />
                  ) : (
                    <Input
                      size="small"
                      value={inputValues[index]}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  )
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
