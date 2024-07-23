import { useEffect, useState } from "react";
import CheckboxComponent from "../../ui/CheckboxComponent";
import Input from "../../ui/Input";
import styles from "./WeightPackaging.module.css";
import StyledSelect from "../../ui/StyledSelect";
import StyledTextArea from "../../ui/StyledTextArea";
import { useField } from "../../hooks";
import { useDispatch } from "react-redux";
import {
  updateFrameDimension,
  updateFramed,
  updatePackagingInstructions,
  updatePackagingType,
  updatePackagingWeight,
  updateTotalWeight,
  updateWeight,
} from "../../slices/artworkSlice";

function WeightPackaging() {
  const [isFramed, setIsFramed] = useState(false);

  const dispatch = useDispatch();

  const weight = useField("number");
  const { onReset: resetWeight, ...weightProps } = weight;
  const width = useField("number");
  const { onReset: resetWidth, ...widthProps } = width;
  const height = useField("number");
  const { onReset: resetHeight, ...heightProps } = height;
  const depth = useField("number");
  const { onReset: resetDepth, ...depthProps } = depth;
  const pkgInstructions = useField("text");
  const { onReset: resetPkgInstructions, ...pkgInstructionsProps } =
    pkgInstructions;
  const estWeight = useField("number");
  const { onReset: resetEstWeight, ...estWeightProps } = estWeight;

  useEffect(() => {
    if (weight.value && estWeight.value) {
      dispatch(updateWeight(Number(weight.value)));

      const totalWeight = Number(weight.value + estWeight.value);

      dispatch(updatePackagingWeight(Number(estWeight.value)));
      dispatch(updateTotalWeight(totalWeight));
    }

    if (isFramed && width.value && height.value) {
      const framedDms = {
        width: Number(width.value),
        height: Number(height.value),
        depth: Number(depth.value),
      };

      dispatch(updateFramed(isFramed));
      dispatch(updateFrameDimension(framedDms));
    }

    if (pkgInstructions.value) {
      dispatch(updatePackagingInstructions(pkgInstructions.value));
    }
  }, [
    depth.value,
    dispatch,
    estWeight.value,
    height.value,
    isFramed,
    pkgInstructions.value,
    weight.value,
    width.value,
  ]);

  function handleFramed() {
    setIsFramed((prevState) => !prevState);
  }

  function handlePackageType(_, option) {
    dispatch(updatePackagingType(option));
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Weight</div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="Enter artwork weight"
            size="small"
            {...weightProps}
          />
          <div>kg</div>
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Framed</div>
        </div>
        <div className={styles.inputWrapper}>
          <CheckboxComponent isChecked={isFramed} onCheck={handleFramed} />
          <p>{isFramed ? "Yes" : "No"}</p>
        </div>
      </div>

      {isFramed && (
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Frame Dimensions</div>
          </div>
          <div className={styles.inputsWrapper}>
            <div className={styles.inputContainer}>
              <p>Width</p>
              <Input placeholder="18" size="small" {...widthProps} />
            </div>
            <div className={styles.inputContainer}>
              <p>Height</p>
              <Input placeholder="10" size="small" {...heightProps} />
            </div>
            <div className={styles.inputContainer}>
              <p>Depth</p>
              <Input placeholder="0.1" size="small" {...depthProps} />
            </div>
            <div>in</div>
          </div>
        </div>
      )}
      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Packaging Type</div>
        </div>
        <StyledSelect
          placeholder="Select packaging type"
          options={["Tube", "Box", "Crate"]}
          onSelect={handlePackageType}
        />
      </div>

      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Special Packaging Instructions</div>
        </div>
        <StyledTextArea
          placeholder="Enter any special instructions or considerations for packaging."
          {...pkgInstructionsProps}
        />
      </div>

      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Estimated Packaging Weight</div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="Enter weight of the packaging"
            size="small"
            {...estWeightProps}
          />
          <div>kg</div>
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Total Shipping Weight</div>
        </div>
        <div className={styles.totalWrapper}>{`${
          weight.value || estWeight.value
            ? Number(weight.value) + Number(estWeight.value)
            : "0"
        }kg`}</div>
      </div>
    </div>
  );
}

export default WeightPackaging;
