import FullButton from "../../ui/FullButton";
import styles from "./Intro.module.css";

function Intro() {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.introText}>
        Do you want to sign up as a collector or an artists?
      </div>
      <div className={styles.buttons}>
        <FullButton>Sign up as a collector</FullButton>
        <FullButton type="secondary">Sign up as an artist</FullButton>
      </div>

      <div className={styles.loginOption}>
        Already have an account? <span>Log in.</span>
      </div>
    </div>
  );
}

export default Intro;
