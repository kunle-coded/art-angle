import { useState } from "react";
import EditIcon from "../components/icons/EditIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ShareIcon from "../components/icons/ShareIcon";
import styles from "./Account.module.css";
import { artworksThree, artists } from "../data";
import DividerLine from "../ui/DividerLine";
import PosterList from "../components/lists/PosterList";
import CardList from "../components/lists/CardList";
import ArtistCardList from "../components/lists/ArtistCardList";
import { Link } from "react-router-dom";

function Account() {
  const [isEditHover, setIsEditHover] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function handleClick(e) {
    console.log("clicked", e);
  }
  function handleTabClick(e) {
    const index = e.target.tabIndex;

    setCurrentItem(index);
  }

  return (
    <div className="container">
      <section className="section_block">
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.sidebarColumn}>
              <div className={styles.sidebarWrapper}>
                <ul className={styles.sidebar} onClick={handleTabClick}>
                  <li
                    className={`${styles.sidebarItem} ${
                      currentItem === 0 ? styles.active : ""
                    }`}
                  >
                    <Link
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
              </div>
            </div>
            <div className={styles.contentColumn}>
              <div className={styles.contentContainer}>
                <h3>Content area</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Account;
