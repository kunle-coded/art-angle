import FullButton from "../../ui/FullButton";
import styles from "./Intro.module.css";
import Onboarding from "./Onboarding";

function Intro({ onSignup, onArtistSignup, onCloseModal, onOpenModal }) {
  function handleOption(e) {
    onOpenModal?.("Login");
  }

  return (
    <div className={styles.wrapper}>
      <Onboarding
        introText="Do you want to sign up as a collector or an artists?"
        closeModal={onCloseModal}
      />

      <div className={styles.contents}>
        <div className={styles.contentContainer}>
          <div className={styles.buttons}>
            <FullButton onClick={onSignup}>Sign up as a collector</FullButton>

            <FullButton type="secondary" onClick={onArtistSignup}>
              Sign up as an artist
            </FullButton>
          </div>
          <div className={styles.loginOption}>
            Already have an account?
            <button className={styles.optionButton} onClick={handleOption}>
              Log in.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
