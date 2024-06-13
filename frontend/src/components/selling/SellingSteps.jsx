import styles from "./SellingSteps.module.css";

function SellingSteps() {
  return (
    <section className="section_block">
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <div className={styles.heading}>Sell in easy steps</div>
          <div className={styles.steps}>
            <div className={styles.stepsWrapper}>
              <div className={styles.stepContainer}>
                <div className={styles.stepInner}>
                  <div className={styles.stepInnerWrapper}>
                    <div className={styles.stepNumber}>01</div>
                    <div className={styles.stepTitle}>Submit your artwork</div>
                    <div className={styles.stepBody}>
                      Login to your artist’s acoount and proceed to the
                      submission page. Enter your artwork details and upload
                      relevant images.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.stepContainer}>
                <div className={styles.stepInner}>
                  <div className={styles.stepInnerWrapper}>
                    <div className={styles.stepNumber}>02</div>
                    <div className={styles.stepTitle}>Wait for review</div>
                    <div className={styles.stepBody}>
                      One of our specialists will review your submission and
                      determine the best sales options. On successful review of
                      your submission, you will be contacted on how to proceed
                      to the next step.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.stepContainer}>
                <div className={styles.stepInner}>
                  <div className={styles.stepInnerWrapper}>
                    <div className={styles.stepNumber}>03</div>
                    <div className={styles.stepTitle}>Get sales options</div>
                    <div className={styles.stepBody}>
                      Review your tailored sales strategy and price estimate.
                      We’ll propose the best way to sell your work—either at
                      auction, through private sale, or a direct listing on Art
                      Angle. You as the artist can opt for the best selling
                      option that meets your goal from our sales options.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.stepContainer}>
                <div className={styles.stepInner}>
                  <div className={styles.stepInnerWrapper}>
                    <div className={styles.stepNumber}>04</div>
                    <div className={styles.stepTitle}>Sell your work</div>
                    <div className={styles.stepBody}>
                      Keep your work until it sells. On successful sale, you
                      will be notified and given necessary instructions on the
                      transfer of the artwork to the new owner. In other to
                      ensure smooth sales process from start to finish, our
                      experienced team will handle the logistics. No costly
                      presale insurance, shipping, or handling fees.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contain}></div>
      <div className={styles.contain}></div>
    </section>
  );
}

export default SellingSteps;
