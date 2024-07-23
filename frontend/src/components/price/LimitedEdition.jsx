import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import FormInput from "../../ui/FormInput";
import Input from "../../ui/Input";
import styles from "./LimitedEdition.module.css";
import { updateAvailableForSale, updateRuns } from "../../slices/artworkSlice";

function LimitedEdition({ artworkTitle }) {
  const runs = useField("text");
  const { onReset: resetRuns, ...runsProps } = runs;
  const available = useField("text");
  const { onReset: resetAvailable, ...availableProps } = available;

  const dispatch = useDispatch();

  useEffect(() => {
    if (runs.value && available.value) {
      dispatch(updateRuns(runs.value));
      dispatch(updateAvailableForSale(available.value));
    }
  }, [available.value, dispatch, runs.value]);

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Default Title</div>
        </div>
        <Input value={artworkTitle} size="small" disabled />
        <div className={styles.runsContainer}>
          <div className={styles.totalRun}>
            <div className={styles.title}>Total Run</div>
            <FormInput
              placeholder="Enter total run"
              label="Total Run"
              size="small"
              {...runsProps}
            />
          </div>
          <div className={styles.availability}>
            <div className={styles.title}>Available For Sale on Art Angle</div>
            <FormInput
              placeholder="Enter availability"
              label="Availability"
              size="small"
              {...availableProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LimitedEdition;
