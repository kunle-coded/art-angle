import { useCallback, useEffect, useState } from "react";
import styles from "./DimensionsInput.module.css";
import Input from "./Input";
import { useField } from "../hooks";

function DimensionsInput({ onInput, dimensions, showDiagram = true }) {
  const [width, setWidth] = useState(dimensions ? dimensions.width : 18);
  const [height, setHeight] = useState(dimensions ? dimensions.height : 10);
  const [depth, setDepth] = useState(dimensions ? dimensions.depth : 0.1);

  const widthInput = useField("number");
  const { onReset: resetWidth, ...widthProps } = widthInput;
  const heightInput = useField("number");
  const { onReset: resetHeight, ...heightProps } = heightInput;
  const depthInput = useField("number");
  const { onReset: resetDepth, ...depthProps } = depthInput;

  const diagramStyle = {
    width: `${width * 10}px`,
    height: `${height * 10}px`,
  };

  const handleInput = useCallback(() => {
    const dimension = {
      width: Number(widthInput.value),
      height: Number(heightInput.value),
      depth: depthInput.value ? Number(depthInput.value) : 0.1,
    };

    onInput("Dimensions", dimension);
  }, [depthInput.value, heightInput.value, onInput, widthInput.value]);

  useEffect(() => {
    if (widthInput.value && heightInput.value) {
      setWidth(widthInput.value);
      setHeight(heightInput.value);
      if (depthInput.value) {
        setDepth(depthInput.value);
      }

      handleInput();
    }
  }, [depthInput.value, handleInput, heightInput.value, widthInput.value]);

  return (
    <div className={styles.container}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputContainer}>
          <p>Width</p>
          <Input placeholder={width} size="small" {...widthProps} />
        </div>
        <div className={styles.inputContainer}>
          <p>Height</p>
          <Input placeholder={height} size="small" {...heightProps} />
        </div>
        <div className={styles.inputContainer}>
          <p>Depth</p>
          <Input placeholder={depth} size="small" {...depthProps} />
        </div>
        <div>in</div>
      </div>
      {showDiagram && (
        <div className={styles.dimensionWrapper}>
          <div className={styles.dimensionInner}>
            <span className={styles.dimensionWidth}>{width} in</span>
            <span className={styles.dimensionHeight}>{height} in</span>
            <div className={styles.dimensionDiagram} style={diagramStyle}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DimensionsInput;
