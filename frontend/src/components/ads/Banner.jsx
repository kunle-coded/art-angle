import Spacer from "../../ui/Spacer";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={"section_block"}>
      <Spacer />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <div className={styles.textWrapper}>
              <div className={styles.heading}>
                No upfront fees, clear pricing estimates, and competitive
                commission structures.
              </div>
              <div className={styles.subHeading}>Have more questions?</div>
              <div className={styles.buttons}>
                <a href="/sell" className={styles.button}>
                  Read FAQs
                </a>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageOne}>
                <img src="/assets/images/entwined-I.webp" alt="" />
              </div>
              <div className={styles.imageTwo}>
                <img src="/assets/images/soulmate-5.webp" alt="" />
              </div>
              <div className={styles.imageThree}>
                <img src="/assets/images/in-movement.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
