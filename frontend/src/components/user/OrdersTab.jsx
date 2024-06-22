import { useState } from "react";
import styles from "./OrdersTab.module.css";
import Button from "../../ui/Button";

function OrdersTab() {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabClick(e) {
    const tabIndex = e.target.tabIndex;
    setActiveTab(tabIndex);
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.tabsContainer}>
          <button
            tabIndex="0"
            className={`${styles.tabBtn} ${
              activeTab === 0 ? styles.activeTab : ""
            }`}
            onClick={handleTabClick}
          >
            Active Offers
          </button>
          <button
            tabIndex="1"
            className={`${styles.tabBtn} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={handleTabClick}
          >
            Past Offers
          </button>
        </div>
        <div className={styles.tabsContent}>
          <div className={styles.defaultContent}>
            <div className={styles.noOffers}>
              <p>You haven't placed an offer yet.</p>
              <Button as="a" href="/artworks">
                Browse Art
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersTab;
