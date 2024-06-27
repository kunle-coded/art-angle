import { useEffect, useState } from "react";
import { Link, useNavigation, useParams } from "react-router-dom";
import styles from "./ArtistsAccount.module.css";
// import { artworksThree, artists } from "../data";
import OffersDashboard from "./OffersDashboard";
import Spinner from "../../ui/Spinner";
import ArtistDetailsTab from "./ArtistDetailsTab";
import { useField } from "../../hooks";
import LabeledInput from "../../ui/LabeledInput";
import Spacer from "../../ui/Spacer";
import LabeledTextArea from "../../ui/LabeledTextArea";
import DetailedListComponent from "../lists/DetailedListComponent";
import DetailedList from "../lists/DetailedList";

function ArtistsAccount() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAccountInfo, setEditAccountInfo] = useState(false);
  const [editArtisticInfo, setEditArtisticInfo] = useState(false);
  const [editPaymentInfo, setEditPaymentInfo] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const { feature } = useParams();
  const { state } = useNavigation();

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

  return (
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
                    <Link
                      tabIndex="3"
                      to="/artists/accounts/logout"
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
                          displayText="John"
                        />
                        <LabeledInput
                          label="Last Name"
                          display={!editAccountInfo}
                          displayText="Doe"
                        />
                        <LabeledInput
                          label="Email Address"
                          display
                          displayText="johndoe@email.com"
                        />
                        <LabeledInput
                          label="Contact Number"
                          display={!editAccountInfo}
                          displayText="+23480605404"
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
                          displayText="Lorem ipsum dolor sit amet consectetur. At ipsum nec augue egestas nunc. Pretium mi erat consequat vulputate sodales tristique nam. In sed mauris pellentesque habitasse pellentesque bibendum sapien aliquam habitant. Massa mattis enim nulla aliquam viverra nullam."
                        />
                        <LabeledInput
                          label="Specialisation"
                          display={!editArtisticInfo}
                          displayText="Painting, Drawing"
                        />
                        <LabeledInput
                          label="Portfolio Link"
                          display={!editArtisticInfo}
                          displayText="https://www.johndoe.com"
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
                          displayText="John Doe"
                        />
                        <LabeledInput
                          label="Account Number"
                          display={!editPaymentInfo}
                          displayText="194757858643"
                        />
                        <LabeledInput
                          label="Bank Name"
                          display={!editPaymentInfo}
                          displayText="Guarantee Trust Bank"
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

export default ArtistsAccount;
