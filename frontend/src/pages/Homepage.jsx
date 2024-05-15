import Slider from "../ui/Slider";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <Slider />
      <div className={styles.homepageContent}>
        <h1>Homepage</h1>

        <div className={styles.test}></div>
      </div>
    </div>
  );
}

export default Homepage;
