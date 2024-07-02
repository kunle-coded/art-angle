import FormInput from "../../ui/FormInput";
import Input from "../../ui/Input";
import styles from "./LimitedEdition.module.css";

function LimitedEdition({ artworkTitle }) {
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
            />
          </div>
          <div className={styles.availability}>
            <div className={styles.title}>Available For Sale on Art Angle</div>
            <FormInput
              placeholder="Enter availability"
              label="Availability"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LimitedEdition;
