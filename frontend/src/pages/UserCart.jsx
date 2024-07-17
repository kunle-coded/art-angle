import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";

import styles from "./UserCart.module.css";
import CartList from "../components/lists/CartList";
import FullButton from "../ui/FullButton";
import StarIcon from "../components/icons/StarIcon";
import ShieldIcon from "../components/icons/ShieldIcon";
import LockIcon from "../components/icons/LockIcon";
import DollarIcon from "../components/icons/DollarIcon";
import Button from "../ui/Button";
import BigCartIcon from "../components/icons/BigCartIcon";
import LinkButton from "../ui/LinkButton";

function UserCart() {
  const { userInfo } = useSelector(getAuth);

  return (
    <div className="page">
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.mainContainer}>
              <div className={styles.headerWrapper}>
                <div className={styles.mainHeader}>Cart</div>
              </div>
              {userInfo.cart.length >= 1 && (
                <ul className={styles.mainContents}>
                  <CartList />
                  <CartList />
                </ul>
              )}

              {(!userInfo || userInfo.cart.length === 0) && (
                <div className={styles.emptyCartWrapper}>
                  <div className={styles.cartIcon}>
                    <BigCartIcon />
                  </div>
                  <div className={styles.emptyCartText}>
                    Your cart is empty.
                  </div>
                  <div className={styles.emptyCartBtn}>
                    <LinkButton link="/artworks">Browse Arts</LinkButton>
                  </div>
                </div>
              )}
            </div>
            <aside className={styles.sidebarContainer}>
              {userInfo.cart.length >= 1 && (
                <div>
                  <div className={styles.headerWrapper}>
                    <div className={styles.mainHeader}>Estimated Total</div>
                    <div className={styles.cartPrice}>₦216,000</div>
                  </div>
                  <div className={styles.cartInfo}>
                    All charges and refunds will be made in NGN (₦216,000) and
                    may be subject to exchange rate fluctuations.
                  </div>
                  <div className={styles.checkoutBtn}>
                    <FullButton type="success">Checkout</FullButton>
                  </div>
                </div>
              )}
              <div className={styles.extraContainer}>
                {/* Positive reviews */}
                <div className={styles.extraItem}>
                  <div className={styles.extraIcon}>
                    <div className={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={styles.starIcon}>
                          <StarIcon />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.extraText}>
                    <span>Thousands of Positive Reviews</span>
                    <p>
                      We deliver world-class customer service to all of our art
                      buyers.
                    </p>
                  </div>
                </div>
                {/* Satisfaction guaranteed */}
                <div className={styles.extraItem}>
                  <div className={styles.extraIcon}>
                    <div className={styles.reviewStars}>
                      <div className={styles.shieldIcon}>
                        <ShieldIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.extraText}>
                    <span>Satisfaction Guaranteed</span>
                    <p>
                      Our 14-day satisfaction guarantee allows you to buy with
                      confidence.
                    </p>
                  </div>
                </div>

                {/* Safe & secure */}
                <div className={styles.extraItem}>
                  <div className={styles.extraIcon}>
                    <div className={styles.reviewStars}>
                      <div className={styles.lockIcon}>
                        <LockIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.extraText}>
                    <span>Safe & Secure Shopping</span>
                    <p>
                      All payments and transactions are secure and encrypted.
                    </p>
                  </div>
                </div>

                {/* Support */}
                <div className={styles.extraItem}>
                  <div className={styles.extraIcon}>
                    <div className={styles.reviewStars}>
                      <div className={styles.dollarIcon}>
                        <DollarIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.extraText}>
                    <span>Support An Artist On Purchase</span>
                    <p>
                      We pay our artists more on every sale than other
                      galleries.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.contactContainer}>
                <div className={styles.support}>Need More Help?</div>
                <Button as="a" href="/support" type="secondary" size="small">
                  Contact Customer Support
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserCart;
