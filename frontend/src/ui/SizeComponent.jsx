import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDeleteUrlParams, useField, useUpdateUrlParams } from "../hooks";
import {
  getFilters,
  removeSizeFilter,
  removeSizeItem,
  updateSize,
  updateSizeFilter,
} from "../slices/filterSlice";
import unitConverter from "../helpers/unitConverter";
import { Sizes } from "../constants/enums";

import styles from "./SizeComponent.module.css";
import Checkbox from "./Checkbox";
import SelectComponent from "../components/filter/SelectComponent";
import Input from "./Input";
import FullButton from "./FullButton";

function SizeComponent({ isOpen = false }) {
  const [selected, setSelected] = useState(0);
  const [sizeLowerValue, setSizeLowerValue] = useState(Sizes.SMALL);
  const [sizeUpperValue, setSizeUpperValue] = useState(Sizes.LARGE);
  const [unit, setUnit] = useState("in");
  const [isShow, setIsShow] = useState(false);
  const [isInputSize, setIsInputSize] = useState(false);
  const [isDisableSelect, setIsDisableSelect] = useState(false);

  const { sizeFilter } = useSelector(getFilters);

  const updateUrlParams = useUpdateUrlParams();
  const removeUrlParams = useDeleteUrlParams();

  const dispatch = useDispatch();

  const minWidth = useField("number");
  const maxWidth = useField("number");
  const minHeight = useField("number");
  const maxHeight = useField("number");
  const { onReset: resetMinWidth, ...minWidthProps } = minWidth;
  const { onReset: resetMaxWidth, ...maxWidthProps } = maxWidth;
  const { onReset: resetMinHeight, ...minHeightProps } = minHeight;
  const { onReset: resetMaxHeight, ...maxHeightProps } = maxHeight;

  useEffect(() => {
    if (isOpen) {
      if (sizeFilter.value || sizeFilter.minSize) {
        let sizeParam = {};
        if (sizeFilter.minSize) {
          sizeParam.size = "MEDIUM";
        } else {
          sizeParam.size =
            sizeFilter.value === sizeLowerValue ? "SMALL" : "LARGE";
        }

        if (sizeParam.size) {
          updateUrlParams(sizeParam);
          let selSize;

          if (sizeFilter.minSize) {
            selSize = `Medium (${sizeLowerValue} - ${sizeUpperValue}${unit})`;
          } else {
            selSize =
              sizeFilter.value === sizeLowerValue
                ? `Small (under ${sizeLowerValue}${unit})`
                : `Large (over ${sizeUpperValue}${unit})`;
          }

          if (selSize) {
            dispatch(updateSize(selSize));
          }
        }
      } else {
        removeUrlParams("size");
        dispatch(removeSizeItem());
      }
    }
  }, [isOpen, dispatch, sizeFilter, sizeLowerValue, sizeUpperValue, unit]);

  useEffect(() => {
    if (isOpen) {
      if (isInputSize) {
        if (!minHeight.value && !maxHeight.value) {
          removeUrlParams("height");
        }

        if (!minWidth.value && !maxWidth.value) {
          removeUrlParams("width");
        }
        if (
          !minWidth.value &&
          !maxWidth.value &&
          !minHeight.value &&
          !maxHeight.value
        ) {
          resetMaxHeight();
          resetMinHeight();
          resetMaxWidth();
          resetMinWidth();
          setIsInputSize(false);
        }
      }
    }
  }, [
    isOpen,
    isInputSize,
    minHeight.value,
    minWidth.value,
    maxHeight.value,
    maxWidth.value,
  ]);

  useEffect(() => {
    if (isOpen) {
      if (isInputSize) {
        if (!sizeFilter.minHeight) {
          resetMinHeight();
        }
        if (!sizeFilter.maxHeight) {
          resetMaxHeight();
        }
        if (!sizeFilter.minWidth) {
          resetMinWidth();
        }
        if (!sizeFilter.maxWidth) {
          resetMaxWidth();
        }
      }
    }
  }, [
    isOpen,
    isInputSize,
    sizeFilter.minHeight,
    sizeFilter.minWidth,
    sizeFilter.maxHeight,
    sizeFilter.maxWidth,
  ]);

  useEffect(() => {
    if (
      isOpen &&
      (minWidth.value || maxWidth.value || maxHeight.value || minHeight.value)
    ) {
      setIsDisableSelect(true);
    } else {
      setIsDisableSelect(false);
    }
  }, [
    isOpen,
    maxHeight.value,
    maxWidth.value,
    minHeight.value,
    minWidth.value,
  ]);

  function handleCheck(index, label) {
    if (label === "in") {
      setSelected(0);
      setSizeLowerValue(Sizes.SMALL);
      setSizeUpperValue(Sizes.LARGE);
      setUnit("in");
    } else {
      setSelected(1);
      setSizeLowerValue(unitConverter(sizeLowerValue, "cm"));
      setSizeUpperValue(unitConverter(sizeUpperValue, "cm") + 1);
      setUnit("cm");
    }
  }

  function toggleShow() {
    setIsShow((show) => !show);
  }

  function handleSetSize() {
    if (
      minWidth.value ||
      maxWidth.value ||
      maxHeight.value ||
      minHeight.value
    ) {
      const sizeObj = {
        minHeight: minHeight.value,
        maxHeight: maxHeight.value,
        minWidth: minWidth.value,
        maxWidth: maxWidth.value,
        unit,
      };
      dispatch(updateSizeFilter(sizeObj));

      const sizeParam = {
        ...(minWidth.value || maxWidth.value
          ? {
              width: `${minWidth.value ? minWidth.value : "+"}-${
                maxWidth.value ? maxWidth.value : "+"
              }`,
            }
          : {}),

        ...(minHeight.value || maxHeight.value
          ? {
              height: `${minHeight.value ? minHeight.value : "+"}-${
                maxHeight.value ? maxHeight.value : "+"
              }`,
            }
          : {}),
      };

      if (sizeParam.height || sizeParam.width) {
        updateUrlParams(sizeParam);
        setIsInputSize(true);
      }

      let customWidth, cutsomHeight;

      if (sizeParam.width) {
        customWidth = `w: ${
          minWidth.value && maxWidth.value
            ? minWidth.value
            : minWidth.value
            ? "from"
            : "to"
        }${minWidth.value && maxWidth.value ? "-" : " "}${
          minWidth.value && maxWidth.value
            ? maxWidth.value
            : minWidth.value
            ? minWidth.value
            : maxWidth.value
        } ${unit}`;

        dispatch(updateSize(customWidth));
      }

      if (sizeParam.height) {
        cutsomHeight = `h: ${
          minHeight.value && maxHeight.value
            ? minHeight.value
            : minHeight.value
            ? "from"
            : "to"
        }${minHeight.value && maxHeight.value ? "-" : " "}${
          minHeight.value && maxHeight.value
            ? maxHeight.value
            : minHeight.value
            ? minHeight.value
            : maxHeight.value
        } ${unit}`;

        dispatch(updateSize(cutsomHeight));
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.info}>
          This is based on the artwork’s average dimension.
        </div>

        <div className={styles.units}>
          <Checkbox
            label="in"
            index={0}
            selected={selected}
            onCheck={handleCheck}
          />
          <Checkbox
            label="cm"
            index={1}
            selected={selected}
            onCheck={handleCheck}
          />
        </div>
        <div className={styles.unit}>
          <SelectComponent
            item={`Small (under ${sizeLowerValue}${unit})`}
            type="size"
            artworkSizes={{ value: sizeLowerValue, unit }}
            disableSelect={isDisableSelect}
          />
          <SelectComponent
            item={`Medium (${sizeLowerValue} - ${sizeUpperValue}${unit})`}
            type="size"
            artworkSizes={{
              value: `${sizeLowerValue} - ${sizeUpperValue}`,
              unit,
            }}
            disableSelect={isDisableSelect}
          />
          <SelectComponent
            item={`Large (over ${sizeUpperValue}${unit})`}
            type="size"
            artworkSizes={{ value: sizeUpperValue, unit }}
            disableSelect={isDisableSelect}
          />
        </div>
        <button className={styles.customButton} onClick={toggleShow}>
          <div className={styles.buttonText}>{`${
            isShow ? "Hide" : "Show"
          } custom size`}</div>
        </button>

        {isShow && (
          <div className={styles.customFieldContainer}>
            <div className={styles.customFieldLabel}>Width</div>
            <div className={styles.customFieldWrapper}>
              <div className={styles.customFieldInput}>
                <div className={styles.fieldWrapper}>
                  <div className={styles.innerWrapper}>
                    <div className={styles.inputContainer}>
                      <Input label={unit} {...minWidthProps} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.customFieldInput}>
                <div className={styles.fieldWrapper}>
                  <div className={styles.innerWrapper}>
                    <div className={styles.inputContainer}>
                      <Input label={unit} {...maxWidthProps} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.customFieldLabel}>Height</div>
            <div className={styles.customFieldWrapper}>
              <div className={styles.customFieldInput}>
                <div className={styles.fieldWrapper}>
                  <div className={styles.innerWrapper}>
                    <div className={styles.inputContainer}>
                      <Input label={unit} {...minHeightProps} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.customFieldInput}>
                <div className={styles.fieldWrapper}>
                  <div className={styles.innerWrapper}>
                    <div className={styles.inputContainer}>
                      <Input label={unit} {...maxHeightProps} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.customFieldBtn}>
              <FullButton disable={!isDisableSelect} onClick={handleSetSize}>
                Set size
              </FullButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SizeComponent;
