import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import styles from "./Footer.module.css";
import FooterColumn from "./FooterColumn";

function Footer() {
  const buyerList = ["Buyer FAQ", "Return Policy", "Testimonial", "Art Prints"];
  const artistList = ["Selling on Art Angle", "Artist Handbook", "Artist FAQ"];
  const artAngleList = ["About", "Press", "Careers", "Blog", "Contact Us"];
  const categoryList = [
    "Paintings",
    "Photography",
    "Sculpture",
    "Drawings",
    "Collage",
  ];

  return (
    <div className={styles.footerSection}>
      <footer className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.topWrapper}>
            <FooterColumn title="For Buyers" list={buyerList} />
            <FooterColumn title="For Artsist" list={artistList} />
            <FooterColumn title="Art Angle" list={artAngleList} />
            <FooterColumn title="Top Categories" list={categoryList} />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.bottomWrapper}>
            <div className={styles.companyContainer}>
              <div className={styles.columnContainer}>
                <div className={styles.brand}>
                  <Logo />
                </div>
                <div className={styles.copyright}>&copy; 2024 Art Angle</div>
              </div>
            </div>
            <div className={styles.columnContainer}>
              <Link to="terms-and-conditions" className={styles.terms}>
                Terms and Conditions
              </Link>
              <Link to="privacy-policy" className={styles.terms}>
                Privacy Policy
              </Link>
              <Link to="cookies-notice" className={styles.terms}>
                Cookies Notice
              </Link>
            </div>
            <div className={styles.columnContainer}>
              <a
                aria-label="X Link"
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={styles.socials}>
                  <svg
                    className={styles.socialIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.053 7.988L15.684 16.012H14.187L8.566 7.988H10.053ZM21 7V17C21 19.209 19.209 21 17 21H7C4.791 21 3 19.209 3 17V7C3 4.791 4.791 3 7 3H17C19.209 3 21 4.791 21 7ZM17.538 17L13.352 11.01L16.774 7H15.463L12.759 10.16L10.552 7H6.702L10.643 12.633L6.906 17H8.239L11.24 13.484L13.698 17H17.538Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
              </a>
              <a
                aria-label="Facebook Link"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={styles.socials}>
                  <svg
                    className={styles.socialLink}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 3H3V21H12.621V14.039H10.278V11.314H12.621V9.309C12.621 6.985 14.042 5.718 16.116 5.718C16.815 5.716 17.513 5.752 18.208 5.823V8.253H16.78C15.65 8.253 15.43 8.787 15.43 9.575V11.31H18.13L17.779 14.035H15.414V21H21V3Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
              </a>
              <a
                aria-label="Instagram Link"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={styles.socials}>
                  <svg
                    className={styles.socialLink}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3C5.239 3 3 5.239 3 8V16C3 18.761 5.239 21 8 21H16C18.761 21 21 18.761 21 16V8C21 5.239 18.761 3 16 3H8ZM18 5C18.552 5 19 5.448 19 6C19 6.552 18.552 7 18 7C17.448 7 17 6.552 17 6C17 5.448 17.448 5 18 5ZM12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
              </a>
              <a
                aria-label="TikTok Link"
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={styles.socials}>
                  <svg
                    className={styles.socialLink}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3C4.35503 3 3 4.35503 3 6V18C3 19.645 4.35503 21 6 21H18C19.645 21 21 19.645 21 18V6C21 4.35503 19.645 3 18 3H6ZM12 7H14C14 8.005 15.471 9 16 9V11C15.395 11 14.668 10.7342 14 10.2852V14C14 15.654 12.654 17 11 17C9.346 17 8 15.654 8 14C8 12.346 9.346 11 11 11V13C10.448 13 10 13.449 10 14C10 14.551 10.448 15 11 15C11.552 15 12 14.551 12 14V7Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
