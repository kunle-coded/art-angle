import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuth, logoutUser } from "../slices/authSlice";
import {
  useDeleteMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} from "../slices/usersApiSlice";
import {
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
import { useArtistArtworksQuery } from "../slices/artworksApiSlice";

function ArtistsAccount() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAccountInfo, setEditAccountInfo] = useState(false);
  const [editArtisticInfo, setEditArtisticInfo] = useState(false);
  const [editPaymentInfo, setEditPaymentInfo] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [biography, setBiography] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const { userInfo } = useSelector(getAuth);

  const [logout] = useLogoutMutation();
  const [deleteUser, { isLoading }] = useDeleteMutation();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();
  const { data: artworks } = useArtistArtworksQuery();

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

  async function updateHandler(e) {
    e.preventDefault();

    if (
      editAccountInfo &&
      !firstname &&
      !lastname &&
      !contactNumber &&
      !password.value
    ) {
      setIsEdit(false);
      setEditAccountInfo(false);
      return;
    }

    if (editArtisticInfo && !biography && !specialisation && !portfolioLink) {
      setIsEdit(false);
      setEditArtisticInfo(false);
      return;
    }
    if (editPaymentInfo && !accountName && !accountNumber && !bankName) {
      setIsEdit(false);
      setEditPaymentInfo(false);
      return;
    }

    if (password.value && password.value !== confirmPassword.value) {
      dispatch(updateSuccessMgs("Passwords do not match"));
      dispatch(enableError());
      return;
    }

    const userData = {};

    if (firstname) {
      userData.firstname = firstname;
    }
    if (lastname) {
      userData.lastname = lastname;
    }
    if (contactNumber) {
      userData.contactNumber = contactNumber;
    }

    if (biography) {
      userData.biography = biography;
    }
    if (specialisation) {
      userData.specialisation = specialisation;
    }
    if (portfolioLink) {
      userData.portfolioLink = portfolioLink;
    }

    if (accountName || accountNumber || bankName) {
      userData.paymentDetails = { accountName, accountNumber, bankName };
    }

    if (password.value && password.value === confirmPassword.value) {
      userData.password = password.value;
    }

    try {
      const res = await updateProfile(userData).unwrap();
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      handleEdit();
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
      console.log(err);
    }
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
                        to="/artist/accounts/settings"
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
                        aria-label="artist-offers"
                        tabIndex="1"
                        to="/artist/accounts/artworks"
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
                        aria-label="artist-orders"
                        tabIndex="2"
                        to="/artist/accounts/orders"
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
                            onSave={updateHandler}
                          >
                            <LabeledInput
                              label="First Name"
                              display={!editAccountInfo}
                              displayText={userInfo.firstname}
                              onInput={setFirstname}
                            />
                            <LabeledInput
                              label="Last Name"
                              display={!editAccountInfo}
                              displayText={userInfo.lastname}
                              onInput={setLastname}
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
                              onInput={setContactNumber}
                            />
                            <LabeledInput
                              label="New Password"
                              placeholder="New Password"
                              {...passwordProps}
                            />

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
                            onSave={updateHandler}
                          >
                            <LabeledInput
                              label="Birth Year"
                              display
                              displayText={userInfo.birthYear}
                            />
                            <LabeledInput
                              label="Nationality"
                              display
                              displayText={userInfo.nationality}
                            />
                            <LabeledTextArea
                              label="Biography"
                              display={!editArtisticInfo}
                              displayText={userInfo.biography}
                              onInput={setBiography}
                            />
                            <LabeledInput
                              label="Specialisation"
                              display={!editArtisticInfo}
                              displayText={userInfo.specialisation}
                              onInput={setSpecialisation}
                            />
                            <LabeledInput
                              label="Portfolio Link"
                              display={!editArtisticInfo}
                              displayText={userInfo.portfolioLink}
                              onInput={setPortfolioLink}
                            />
                          </ArtistDetailsTab>
                          <Spacer />
                          <ArtistDetailsTab
                            title="Payment Details"
                            isEdit={isEdit && editPaymentInfo}
                            onEdit={() => handleEdit(3)}
                            onSave={updateHandler}
                          >
                            <LabeledInput
                              label="Account Name"
                              display={!editPaymentInfo}
                              displayText={
                                userInfo?.paymentDetails?.accountName
                              }
                              onInput={setAccountName}
                            />
                            <LabeledInput
                              label="Account Number"
                              display={!editPaymentInfo}
                              displayText={
                                userInfo?.paymentDetails?.accountNumber
                              }
                              onInput={setAccountNumber}
                            />
                            <LabeledInput
                              label="Bank Name"
                              display={!editPaymentInfo}
                              displayText={userInfo?.paymentDetails?.bankName}
                              onInput={setBankName}
                            />
                          </ArtistDetailsTab>
                        </>
                      )}
                      {feature === "artworks" && (
                        <OffersDashboard tabFor="Artworks" list={artworks} />
                      )}
                      {feature === "orders" && (
                        <OffersDashboard
                          tabFor="Orders"
                          list={userInfo.orders}
                        />
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
