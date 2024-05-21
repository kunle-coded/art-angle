import Button from "../../ui/Button";
import styles from "./AdBanner.module.css";

function AdBanner() {
  return (
    <div className="section_block">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <div className={styles.textWrapper}>
              <div className={styles.heading}>
                Sell art from your collection
              </div>
              <div className={styles.subHeading}>
                Start selling on Art Angle to find the right buyer for your
                work.
              </div>
              <div className={styles.buttons}>
                <Button as="a" href="/sell">
                  Start Selling
                </Button>
                <Button as="a" type="secondary" href="/contact">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageOne}>
                <img src="cat-contemporary.png" alt="" />
              </div>
              <div className={styles.imageTwo}>
                <img src="ad-image2.png" alt="" />
              </div>
              <div className={styles.imageThree}>
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
