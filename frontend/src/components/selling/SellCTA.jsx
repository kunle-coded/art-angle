import { useSelector } from "react-redux";
import { getAuth } from "../../slices/authSlice";

import Spacer from "../../ui/Spacer";
import styles from "./SellCTA.module.css";
import Modal from "../modal/Modal";
import SignupArtist from "../auth/SignupArtist";

function SellCTA() {
  const { userInfo } = useSelector(getAuth);

  return (
    <div className="section_block">
      <Spacer />
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <div className={styles.ctaText}>
            Sell with Art Angle is the simple, comprehensive way to reach a
            global community of art lovers.
          </div>
          <div className={styles.ctaBtn}>
            {userInfo?.userType === "artist" ? (
              <a
                href={`/artist/${userInfo.id}/artwork/upload`}
                className={styles.button}
              >
                Start Selling
              </a>
            ) : (
              <Modal>
                <Modal.Open opens="Signup Artist">
                  <button className={styles.button}>Start Selling</button>
                </Modal.Open>
                <Modal.Window name="Signup Artist">
                  <SignupArtist />
                </Modal.Window>
              </Modal>
            )}
          </div>
        </div>
      </div>
      <div className={styles.contain}></div>
    </div>
  );
}

export default SellCTA;
