import styles from "./Footer.module.css";
import FooterColumn from "./FooterColumn";

function Footer() {
  const buyerList = ["Buyer FAQ", "Return Policy", "Testimonial", "Art Prints"];
  // const buyerList=["Buyer FAQ", "Return Policy", "Testimonial", "Art Prints"]
  // const buyerList=["Buyer FAQ", "Return Policy", "Testimonial", "Art Prints"]
  // const buyerList=["Buyer FAQ", "Return Policy", "Testimonial", "Art Prints"]

  return (
    <div className={styles.footerSection}>
      <footer className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.topWrapper}>
            <FooterColumn title="For Buyers" list={buyerList} />
            <FooterColumn />
            <FooterColumn />
            <FooterColumn />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <h1>Bottom Footer Here</h1>
          <div className={styles.bottomWrapper}></div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
