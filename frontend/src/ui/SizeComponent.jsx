import { useState } from "react";
import Checkbox from "./Checkbox";
import styles from "./SizeComponent.module.css";
import SelectComponent from "../components/filter/SelectComponent";
import unitConverter from "../helpers/unitConverter";
import Input from "./Input";

function SizeComponent() {
  const [selected, setSelected] = useState(0);
  const [sizeLowerValue, setSizeLowerValue] = useState(40);
  const [sizeUpperValue, setSizeUpperValue] = useState(100);
  const [unit, setUnit] = useState("cm");
  const [isShow, setIsShow] = useState(false);

  function handleCheck(index, label) {
    if (label === "in") {
      setSelected(1);
      setSizeLowerValue(unitConverter(sizeLowerValue, "in"));
      setSizeUpperValue(unitConverter(sizeUpperValue, "in") + 1);
      setUnit("in");
    } else {
      setSelected(0);
      setSizeLowerValue(40);
      setSizeUpperValue(100);
      setUnit("cm");
    }
  }

  function toggleShow() {
    setIsShow((show) => !show);
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        This is based on the artwork’s average dimension.
      </div>

      <div className={styles.units}>
        <Checkbox
          label="cm"
          index={0}
          selected={selected}
          onCheck={handleCheck}
        />
        <Checkbox
          label="in"
          index={1}
          selected={selected}
          onCheck={handleCheck}
        />
      </div>
      <div className={styles.unit}>
        <SelectComponent
          item={`Small (under ${sizeLowerValue}${unit})`}
          type="size"
        />
        <SelectComponent
          item={`Medium (${sizeLowerValue}${unit} - ${sizeUpperValue}${unit})`}
          type="size"
        />
        <SelectComponent
          item={`Large (over ${sizeUpperValue}${unit})`}
          type="size"
        />
      </div>
      <button className={styles.customButton} onClick={toggleShow}>
        <div className={styles.buttonText}>{`${
          isShow ? "Hide" : "Show"
        } custom size`}</div>
      </button>

      {isShow && (
        <div>
          <div className={styles.customFieldLabel}>Width</div>
          <div className={styles.customFieldInput}>
            <div className={styles.fieldWrapper}>
              <div className={styles.innerWrapper}>
                <div className={styles.inputContainer}>
                  <Input label={unit} />
                </div>
              </div>
            </div>
            <div className={styles.inputSpacer}></div>
            <div className={styles.fieldWrapper}>
              <div className={styles.innerWrapper}>
                <div className={styles.inputContainer}>
                  <Input label={unit} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.customFieldLabel}>Height</div>
          <div className={styles.customFieldInput}>
            <div className={styles.fieldWrapper}>
              <div className={styles.innerWrapper}>
                <div className={styles.inputContainer}>
                  <Input label={unit} />
                </div>
              </div>
            </div>
            <div className={styles.inputSpacer}></div>
            <div className={styles.fieldWrapper}>
              <div className={styles.innerWrapper}>
                <div className={styles.inputContainer}>
                  <Input label={unit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SizeComponent;
