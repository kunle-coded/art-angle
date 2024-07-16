import { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import styles from "./UserAccount.module.css";
// import { artworksThree, artists } from "../data";
import UserDetailsTab from "../components/user/UserDetailsTab";
import OffersDashboard from "../components/user/OffersDashboard";
import Spinner from "../ui/Spinner";
import DetailedListComponent from "../components/lists/DetailedListComponent";
import DetailedList from "../components/lists/DetailedList";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { getAuth, logout } from "../slices/authSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../slices/globalSlice";
import Modal from "../components/modal/Modal";
import ConfirmDelete from "../components/messages/ConfirmDelete";

function UserAccount() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [logoutUser] = useLogoutMutation();
  const [deleteUser, { isLoading }] = useDeleteMutation();

  const { feature } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  async function logoutHandler(e) {
    e.preventDefault();

    try {
      await logoutUser().unwrap();
      dispatch(logout());
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteHandler(e) {
    e.preventDefault();

    try {
      const res = await deleteUser().unwrap();
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      dispatch(logout());
      navigate("/");
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
      console.log(err);
    }
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
                        to="/user/accounts/settings"
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
                        to="/user/accounts/offers"
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
                        to="/user/accounts/orders"
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
                      <button
                        tabIndex="3"
                        className={styles.sidebarLink}
                        onClick={logoutHandler}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <div className={styles.contentArea}>
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
                  )}
                  <div className={styles.footerContainer}>
                    <Modal>
                      <Modal.Open opens="confirm_delete">
                        <button className={styles.footerBtn}>
                          Deactivate Account
                        </button>
                      </Modal.Open>
                      <Modal.Window name="confirm_delete">
                        <ConfirmDelete
                          message="Are you sure you want to deactivate your account?"
                          onConfirm={deleteHandler}
                        />
                      </Modal.Window>
                    </Modal>
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
