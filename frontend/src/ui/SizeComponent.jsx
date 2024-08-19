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

function SizeComponent({ isOpen = false }) {
  const [selected, setSelected] = useState(0);
  const [sizeLowerValue, setSizeLowerValue] = useState(Sizes.SMALL);
  const [sizeUpperValue, setSizeUpperValue] = useState(Sizes.LARGE);
  const [unit, setUnit] = useState("in");
  const [isShow, setIsShow] = useState(false);
  const [isInputSize, setIsInputSize] = useState(false);
  const [isSizeReset, setIsSizeReset] = useState(false);

  const { sizeFilter } = useSelector(getFilters);

  const updateUrlParams = useUpdateUrlParams();
  const removeUrlParams = useDeleteUrlParams();

  const dispatch = useDispatch();

  const width = useField("number");
  const height = useField("number");
  const { onReset: resetWidth, ...widthProps } = width;
  const { onReset: resetHeight, ...heightProps } = height;

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
  }, [isOpen, dispatch, sizeFilter, sizeLowerValue, unit]);

  useEffect(() => {
    if (isOpen) {
      if (width.value && height.value) {
        setIsInputSize(true);
        const sizeObj = { width: width.value, height: height.value, unit };
        dispatch(updateSizeFilter(sizeObj));
      } else {
        setIsInputSize(false);
        dispatch(removeSizeFilter());
      }
    }
  }, [dispatch, height.value, isOpen, unit, width.value]);

  useEffect(() => {
    if (isOpen) {
      if (isInputSize && sizeFilter.width) {
        const sizeParam = {
          size: `CUSTOM-${width.value}x${height.value}${unit}`,
        };

        if (sizeParam.size) {
          updateUrlParams(sizeParam);
          const selSize = `Custom size: ${width.value} x ${height.value} ${unit}`;
          dispatch(updateSize(selSize));
          setIsSizeReset(true);
        }
      } else {
        removeUrlParams("size");
        dispatch(removeSizeItem());
      }
    }
  }, [
    isOpen,
    dispatch,
    sizeFilter,
    unit,
    isInputSize,
    width.value,
    height.value,
  ]);

  useEffect(() => {
    if (isOpen) {
      if (isSizeReset && (!sizeFilter.width || !sizeFilter.height)) {
        resetHeight();
        resetWidth();
      }
    }
  }, [isOpen, isSizeReset, sizeFilter]);

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

  return (
    <div className={styles.container}>
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
          disableSelect={width.value && height.value}
        />
        <SelectComponent
          item={`Medium (${sizeLowerValue} - ${sizeUpperValue}${unit})`}
          type="size"
          artworkSizes={{
            value: `${sizeLowerValue} - ${sizeUpperValue}`,
            unit,
          }}
          disableSelect={width.value && height.value}
        />
        <SelectComponent
          item={`Large (over ${sizeUpperValue}${unit})`}
          type="size"
          artworkSizes={{ value: sizeUpperValue, unit }}
          disableSelect={width.value && height.value}
        />
      </div>
      <button className={styles.customButton} onClick={toggleShow}>
        <div className={styles.buttonText}>{`${
          isShow ? "Hide" : "Show"
        } custom size`}</div>
      </button>

      {isShow && (
        <div className={styles.customFieldContainer}>
          <div>
            <div className={styles.customFieldLabel}>Width</div>

            <div className={styles.customFieldInput}>
              <div className={styles.fieldWrapper}>
                <div className={styles.innerWrapper}>
                  <div className={styles.inputContainer}>
                    <Input label={unit} {...widthProps} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.customFieldLabel}>Height</div>

            <div className={styles.customFieldInput}>
              <div className={styles.fieldWrapper}>
                <div className={styles.innerWrapper}>
                  <div className={styles.inputContainer}>
                    <Input label={unit} {...heightProps} />
                  </div>
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
