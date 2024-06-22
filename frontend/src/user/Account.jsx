import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIconFilled from "../components/icons/EditIconFilled";
import styles from "./Account.module.css";
import { artworksThree, artists } from "../data";
import DividerLine from "../ui/DividerLine";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import UserDetailsTab from "../ui/UserDetailsTab";

function Account() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const { feature } = useParams();

  function handleEdit(e) {
    setIsEdit((prevState) => !prevState);
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
                {feature === "settings" && (
                  <div className={styles.contentHeader}>
                    <div className={styles.header}>
                      {!isEdit && !isEditing && (
                        <ButtonWithIcon
                          text="Edit"
                          type="secondary"
                          onClick={handleEdit}
                        >
                          <EditIconFilled />
                        </ButtonWithIcon>
                      )}

                      {(isEdit || isEditing) && (
                        <ButtonWithIcon text="Save" onClick={handleEdit} />
                      )}
                    </div>
                  </div>
                )}

                {feature === "settings" && <DividerLine />}

                <div className={styles.contentArea}>
                  {feature === "settings" && (
                    <UserDetailsTab display={!isEdit} onEdit={setIsEditing} />
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
  );
}

export default Account;
