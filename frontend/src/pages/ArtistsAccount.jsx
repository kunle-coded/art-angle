import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuth, logoutUser } from "../slices/authSlice";
import { useDeleteMutation, useLogoutMutation } from "../slices/usersApiSlice";
import {
  activateLogout,
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../slices/globalSlice";

import styles from "./ArtistsAccount.module.css";
// import { artworksThree, artists } from "../data";
import OffersDashboard from "../components/user/OffersDashboard";
import Spinner from "../ui/Spinner";
import ArtistDetailsTab from "../components/artist/ArtistDetailsTab";
import { useField } from "../hooks";
import LabeledInput from "../ui/LabeledInput";
import Spacer from "../ui/Spacer";
import LabeledTextArea from "../ui/LabeledTextArea";
import DetailedListComponent from "../components/lists/DetailedListComponent";
import DetailedList from "../components/lists/DetailedList";
import Modal from "../components/modal/Modal";
import ConfirmDelete from "../components/messages/ConfirmDelete";

function ArtistsAccount() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAccountInfo, setEditAccountInfo] = useState(false);
  const [editArtisticInfo, setEditArtisticInfo] = useState(false);
  const [editPaymentInfo, setEditPaymentInfo] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const { userInfo } = useSelector(getAuth);

  const [logout] = useLogoutMutation();
  const [deleteUser, { isLoading }] = useDeleteMutation();

  const { feature } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = useField("text");
  const { onReset: resetPassword, ...passwordProps } = password;
  const confirmPassword = useField("text");
  const { onReset: resetconfirmPassword, ...confirmPasswordProps } =
    confirmPassword;

  useEffect(() => {
    if (password.value) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [password.value]);

  useEffect(() => {
    if (feature === "settings") {
      setCurrentItem(0);
    } else if (feature === "artworks") {
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

  function handleEdit(index) {
    setIsEdit((prevState) => !prevState);

    if (index === 1) {
      setEditAccountInfo((prevState) => !prevState);
    } else if (index === 2) {
      setEditArtisticInfo((prevState) => !prevState);
    } else if (index === 3) {
      setEditPaymentInfo((prevState) => !prevState);
    }
  }

  function handleCheck() {
    setIsAllChecked((prevState) => !prevState);
  }

  function handleCancel() {
    setIsAllChecked(false);
  }

  function logoutHandler(e) {
    e.preventDefault();

    logout();
    dispatch(logoutUser());
    navigate("/");
  }

  async function deleteHandler(e) {
    e.preventDefault();

    try {
      const res = await deleteUser().unwrap();
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      logoutHandler();
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
                        to="/artists/accounts/settings"
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
                        to="/artists/accounts/artworks"
                        className={styles.sidebarLink}
                      >
                        Artwork Dashboard
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
                        to="/artists/accounts/orders"
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
                      {feature === "settings" && (
                        <>
                          <ArtistDetailsTab
                            title="Account Information"
                            isPassword
                            isEdit={isEdit && editAccountInfo}
                            isEditing={isEditing}
                            onEdit={() => handleEdit(1)}
                          >
                            <LabeledInput
                              label="First Name"
                              display={!editAccountInfo}
                              displayText={userInfo.firstname}
                            />
                            <LabeledInput
                              label="Last Name"
                              display={!editAccountInfo}
                              displayText={userInfo.lastname}
                            />
                            <LabeledInput
                              label="Email Address"
                              display
                              displayText={userInfo.email}
                            />
                            <LabeledInput
                              label="Contact Number"
                              display={!editAccountInfo}
                              displayText={userInfo.contactNumber}
                            />
                            <LabeledInput
                              label="New Password"
                              placeholder="New Password"
                              {...passwordProps}
                            />

                            <div className={styles.errorContainer}>
                              <div className={styles.errorSidebar}></div>
                              <div className={styles.errorMessage}>
                                Incorrect password. Please check and try again.
                              </div>
                            </div>

                            <LabeledInput
                              label="Confirm Password"
                              placeholder="Confirm Password"
                              {...confirmPasswordProps}
                            />
                          </ArtistDetailsTab>
                          <Spacer />
                          <ArtistDetailsTab
                            title="Artistic Information"
                            isEdit={isEdit && editArtisticInfo}
                            onEdit={() => handleEdit(2)}
                          >
                            <LabeledTextArea
                              label="Biography"
                              display={!editArtisticInfo}
                              displayText={userInfo.biography}
                            />
                            <LabeledInput
                              label="Specialisation"
                              display={!editArtisticInfo}
                              displayText={userInfo.specialisation}
                            />
                            <LabeledInput
                              label="Portfolio Link"
                              display={!editArtisticInfo}
                              displayText={userInfo.portfolioLink}
                            />
                          </ArtistDetailsTab>
                          <Spacer />
                          <ArtistDetailsTab
                            title="Payment Details"
                            isEdit={isEdit && editPaymentInfo}
                            onEdit={() => handleEdit(3)}
                          >
                            <LabeledInput
                              label="Account Name"
                              display={!editPaymentInfo}
                              displayText={
                                userInfo?.paymentDetails?.accountName
                              }
                            />
                            <LabeledInput
                              label="Account Number"
                              display={!editPaymentInfo}
                              displayText={
                                userInfo?.paymentDetails?.accountNumber
                              }
                            />
                            <LabeledInput
                              label="Bank Name"
                              display={!editPaymentInfo}
                              displayText={userInfo?.paymentDetails?.bankName}
                            />
                          </ArtistDetailsTab>
                        </>
                      )}
                      {feature === "artworks" && (
                        <OffersDashboard tabFor="Artworks">
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

export default ArtistsAccount;
