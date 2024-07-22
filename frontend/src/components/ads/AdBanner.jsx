import { useSelector } from "react-redux";
import { getAuth } from "../../slices/authSlice";

import Button from "../../ui/Button";
import SignupArtist from "../auth/SignupArtist";
import Modal from "../modal/Modal";
import styles from "./AdBanner.module.css";

function AdBanner({ background = true }) {
  const { userInfo } = useSelector(getAuth);

  return (
    <div className={background ? "section_block" : "section_basic"}>
      <div className={styles.container}>
        <div
          className={`${styles.content} ${
            !background ? styles.noBackground : ""
          }`}
        >
          <div
            className={`${styles.textContainer} ${
              !background ? styles.fullWidth : ""
            }`}
          >
            <div className={styles.textWrapper}>
              <h1
                className={`${background ? styles.heading : styles.bigHeading}`}
              >
                Sell art from your collection
              </h1>
              <div className={styles.subHeading}>
                Start selling on Art Angle to find the right buyer for your
                work.
              </div>
              <div
                className={`${styles.buttons} ${
                  !background ? styles.buttonsNoBg : ""
                }`}
              >
                {userInfo?.userType === "artist" ? (
                  <Button as="a" href={`/artist/${userInfo.id}/artwork/upload`}>
                    Start Selling
                  </Button>
                ) : (
                  <Modal>
                    <Modal.Open opens="Signup Artist">
                      <Button>Start Selling</Button>
                    </Modal.Open>
                    <Modal.Window name="Signup Artist">
                      <SignupArtist />
                    </Modal.Window>
                  </Modal>
                )}
                <Button as="a" type="secondary" href="/contact">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <div
                className={`${styles.imageOne} ${
                  !background ? styles.fullImgOne : ""
                }`}
              >
                <img src="cat-contemporary.png" alt="" />
              </div>
              <div
                className={`${styles.imageTwo} ${
                  !background ? styles.fullImgTwo : ""
                }`}
              >
                <img src="ad-image2.png" alt="" />
              </div>
              <div
                className={`${styles.imageThree} ${
                  !background ? styles.fullImgThree : ""
                }`}
              >
                <img src="ad-image3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdBanner;
