import StrategyCard from "./StrategyCard";
import styles from "./StrategyComponent.module.css";

function StrategyComponent() {
  return (
    <section className="section_block">
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.title}>
              A sales strategy tailored to your goals
            </div>
            <div className={styles.subtitle}>
              Our dedicated specialists work with you to select the best sales
              option for your artwork.
            </div>
          </div>
          <div className={styles.cardsGrid}>
            <StrategyCard
              title="Auctions"
              body="Our curated auctions provide you with multiple opportunities to reach the widest audience and successfully achieve your artwork’s full potential."
              imgUrl="/assets/artists/damola-ayegbayo.webp"
            />
            <StrategyCard
              title="Private sales"
              body="We offer tailored and discreet sales arrangements for our collectors’ highest value and most sensitive artworks."
              big
              imgUrl="/assets/artists/omoyeni-arogunmati.webp"
            />
            <StrategyCard
              title="Online marketplace"
              body="When your work is listed directly on Artsy.net—the world’s largest online art marketplace—it reaches over 3 million art lovers."
              imgUrl="/assets/artists/ayo-adeleye.webp"
            />
          </div>
        </div>
      </div>
      <div className={styles.contain}></div>
      <div className={styles.contain}></div>
    </section>
  );
}

export default StrategyComponent;
