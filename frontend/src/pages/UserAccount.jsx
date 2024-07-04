import { useEffect, useState } from "react";
import { Link, useNavigation, useParams } from "react-router-dom";
import styles from "./UserAccount.module.css";
// import { artworksThree, artists } from "../data";
import UserDetailsTab from "../components/user/UserDetailsTab";
import OffersDashboard from "../components/user/OffersDashboard";
import Spinner from "../ui/Spinner";
import DetailedListComponent from "../components/lists/DetailedListComponent";
import DetailedList from "../components/lists/DetailedList";

function UserAccount() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const { feature } = useParams();
  const { state } = useNavigation();

  useEffect(() => {
    if (feature === "settings") {
      setCurrentItem(0);
    } else if (feature === "offers") {
      setCurrentItem(1);
    } else if (feature === "orders") {
      setCurrentItem(2);
    } else if (feature === "logout") {
      setCurrentItem(3);
    }
  }, [feature]);

  function handleTabClick(e) {
    const index = e.target.tabIndex;
    setCurrentItem(index);
  }

  function handleCheck() {
    setIsAllChecked((prevState) => !prevState);
  }

  function handleCancel() {
    setIsAllChecked(false);
  }

  return (
    <div className="page">
      <div className="container">
        <section className="section_block">
          <div className={styles.wrapper}>
            <div className={styles.innerContainer}>
              <div className={styles.sidebarColumn}>
                <nav className={styles.sidebarWrapper}>
                  <ul className={styles.sidebar} onClick={handleTabClick}>
                    <li
                      className={`${styles.sidebarItem} ${
                        currentItem === 0 ? styles.active : ""
                      }`}
                    >
                      <Link
                        aria-label="account-settings"
                        tabIndex="0"
                        to="/accounts/settings"
                        className={styles.sidebarLink}
                      >
                        Account Information
                      </Link>
                    </li>
                    <li
                      className={`${styles.sidebarItem} ${
                        currentItem === 1 ? styles.active : ""
                      }`}
                    >
                      <Link
                        aria-label="user-offers"
                        tabIndex="1"
                        to="/accounts/offers"
                        className={styles.sidebarLink}
                      >
                        Offers Dashboard
                      </Link>
                    </li>
                    <li
                      className={`${styles.sidebarItem} ${
                        currentItem === 2 ? styles.active : ""
                      }`}
                    >
                      <Link
                        aria-label="user-orders"
                        tabIndex="2"
                        to="/accounts/orders"
                        className={styles.sidebarLink}
                      >
                        Orders
                      </Link>
                    </li>
                    <li
                      className={`${styles.sidebarItem} ${
                        currentItem === 3 ? styles.active : ""
                      }`}
                    >
                      <Link
                        tabIndex="3"
                        to="/accounts/logout"
                        className={styles.sidebarLink}
                      >
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.contentArea}>
                    {state === "loading" && <Spinner />}
                    {feature === "settings" && <UserDetailsTab />}
                    {feature === "offers" && (
                      <OffersDashboard tabFor="Offers">
                        <DetailedListComponent
                          isChecked={isAllChecked}
                          onCheck={handleCheck}
                          onCancel={handleCancel}
                        >
                          <DetailedList isAllChecked={isAllChecked} />
                          <DetailedList isAllChecked={isAllChecked} />
                        </DetailedListComponent>
                      </OffersDashboard>
                    )}
                    {feature === "orders" && (
                      <OffersDashboard tabFor="Orders">
                        <DetailedListComponent
                          isChecked={isAllChecked}
                          onCheck={handleCheck}
                          onCancel={handleCancel}
                        >
                          <DetailedList isAllChecked={isAllChecked} />
                          <DetailedList isAllChecked={isAllChecked} />
                        </DetailedListComponent>
                      </OffersDashboard>
                    )}
                  </div>
                  <div className={styles.footerContainer}>
                    <button className={styles.footerBtn}>
                      Deactivate Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserAccount;
