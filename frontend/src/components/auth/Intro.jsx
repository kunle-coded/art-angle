import FullButton from "../../ui/FullButton";
import LogoIcon from "../icons/LogoIcon";
import styles from "./Intro.module.css";

function Intro({ onSignup, onArtistSignup }) {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <div className={styles.logoInner}>
            <LogoIcon />
          </div>
          <div className={styles.logoText}>Art Angle</div>
        </div>
        <div className={styles.contents}>
          <div className={styles.contentContainer}>
            <div className={styles.introText}>
              Do you want to sign up as a collector or an artists?
            </div>
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
    </div>
  );
}

export default Intro;
