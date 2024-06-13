import Spacer from "../../ui/Spacer";
import styles from "./SellCTA.module.css";

function SellCTA() {
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
            <a href="/sell" className={styles.button}>
              Start Selling
            </a>
          </div>
        </div>
      </div>
      <div className={styles.contain}></div>
    </div>
  );
}

export default SellCTA;
