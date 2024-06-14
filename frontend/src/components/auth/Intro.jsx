import FullButton from "../../ui/FullButton";
import LogoIcon from "../icons/LogoIcon";
import Modal from "../modal/Modal";
import styles from "./Intro.module.css";
import Signup from "./Signup";

function Intro({ onCloseModal }) {
  function handleClick() {
    console.log(onCloseModal); // Check if onCloseModal is defined
    if (onCloseModal) {
      onCloseModal(); // Close the first modal
    }
  }
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
              <Modal>
                <Modal.Open opens="Signup">
                  <FullButton onClick={handleClick}>
                    Sign up as a collector
                  </FullButton>
                </Modal.Open>
                <Modal.Window name="Signup">
                  <Signup />
                </Modal.Window>
              </Modal>

              <FullButton type="secondary">Sign up as an artist</FullButton>
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
