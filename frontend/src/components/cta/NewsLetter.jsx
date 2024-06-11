import styles from "./NewsLetter.module.css";

function NewsLetter() {
  return (
    <section className="section_block">
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <div className={styles.textContainer}>
              <div className={styles.heading}>Art Angle Digest</div>
              <div className={styles.subheading}>
                Discover new art and collection added weekly by our curators.
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Your email address"
                className={styles.ctaInput}
              />
              <div className={styles.ctaButton}>
                <button className={styles.button}>Subscribe</button>
              </div>
            </div>
          </div>
          <div className={styles.gridIte}></div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
