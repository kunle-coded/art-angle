import CartList from "../components/lists/CartList";
import styles from "./UserCart.module.css";

function UserCart() {
  return (
    <div className="page">
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.mainContainer}>
              <div className={styles.headerWrapper}>
                <div className={styles.mainHeader}>Cart</div>
              </div>
              <ul className={styles.mainContents}>
                <CartList />
                <CartList />
              </ul>
            </div>
            <aside className={styles.sidebarContainer}>
              <div className={styles.headerWrapper}>
                <div className={styles.mainHeader}>Estimated Total</div>
                <div className={styles.cartPrice}>₦216,000</div>
              </div>
              <div className={styles.contentGri}></div>
            </aside>
          </div>
          <div className={styles.contentGri}></div>
          <div className={styles.contentGri}></div>
        </div>
      </section>
    </div>
  );
}

export default UserCart;
