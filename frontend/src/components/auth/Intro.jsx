import FullButton from "../../ui/FullButton";
import LogoIcon from "../icons/LogoIcon";
import styles from "./Intro.module.css";
import Onboarding from "./Onboarding";

function Intro({ onSignup, onArtistSignup }) {
  return (
    <div className={styles.wrapper}>
      <Onboarding introText="Do you want to sign up as a collector or an artists?" />

      <div className={styles.contents}>
        <div className={styles.contentContainer}>
          <div className={styles.buttons}>
            <FullButton onClick={onSignup}>Sign up as a collector</FullButton>

            <FullButton type="secondary" onClick={onArtistSignup}>
              Sign up as an artist
            </FullButton>
          </div>

          <div className={styles.loginOption}>
            Already have an account? <span>Log in.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
