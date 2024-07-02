import { useEffect, useState } from "react";
import styles from "./DimensionsInput.module.css";
import Input from "./Input";
import { useField } from "../hooks";

function DimensionsInput({ onInput }) {
  const [width, setWidth] = useState("18");
  const [height, setHeight] = useState("10");
  const [depth, setDepth] = useState("0.1");

  const widthInput = useField("text");
  const { onReset: resetWidth, ...widthProps } = widthInput;
  const heightInput = useField("text");
  const { onReset: resetHeight, ...heightProps } = heightInput;
  const depthInput = useField("text");
  const { onReset: resetDepth, ...depthProps } = depthInput;

  const diagramStyle = {
    width: `${width * 20}px`,
    height: `${height * 20}px`,
  };

  useEffect(() => {
    if (widthInput.value && heightInput.value && depthInput.value) {
      setWidth(widthInput.value);
      setHeight(heightInput.value);
      setDepth(depthInput.value);

      const dimension = {
        width: widthInput.value,
        height: heightInput.value,
        depth: depthInput.value,
      };

      onInput("Dimensions", dimension);
    }
  }, [depthInput.value, heightInput.value, onInput, widthInput.value]);

  return (
    <div className={styles.container}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Width</p>
          <Input placeholder={width} size="small" {...widthProps} />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Height</p>
          <Input placeholder={height} size="small" {...heightProps} />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Depth</p>
          <Input placeholder={depth} size="small" {...depthProps} />
        </div>
        <div>in</div>
      </div>
      <div className={styles.dimensionWrapper}>
        <div className={styles.dimensionInner}>
          <span className={styles.dimensionWidth}>{width} in</span>
          <span className={styles.dimensionHeight}>{height} in</span>
          <div className={styles.dimensionDiagram} style={diagramStyle}></div>
        </div>
      </div>
    </div>
  );
}

export default DimensionsInput;
