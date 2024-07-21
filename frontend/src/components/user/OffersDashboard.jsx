import { useState } from "react";
import styles from "./OffersDashboard.module.css";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getAuth } from "../../slices/authSlice";
import DetailedListComponent from "../lists/DetailedListComponent";
import DetailedList from "../lists/DetailedList";

function OffersDashboard({ tabFor = "", list = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const { userInfo } = useSelector(getAuth);

  function handleTabClick(e) {
    const tabIndex = e.target.tabIndex;
    setActiveTab(tabIndex);
  }

  function handleCheck() {
    setIsAllChecked((prevState) => !prevState);
  }

  function handleCancel() {
    setIsAllChecked(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div
          className={`${styles.tabsContainer} ${
            list.length >= 1 ? styles.fullwidth : ""
          }`}
        >
          <button
            tabIndex="0"
            className={`${styles.tabBtn} ${
              activeTab === 0 ? styles.activeTab : ""
            }`}
            onClick={handleTabClick}
          >
            Active {tabFor}
          </button>
          <button
            tabIndex="1"
            className={`${styles.tabBtn} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={handleTabClick}
          >
            {`${tabFor === "Artworks" ? "Sold" : "Past"}`} {tabFor}
          </button>
        </div>
        <div className={styles.tabsContent}>
          {list.length >= 1 ? (
            <DetailedListComponent
              isChecked={isAllChecked}
              onCheck={handleCheck}
              onCancel={handleCancel}
            >
              {list.map((listItem) => (
                <DetailedList key={listItem.id} isAllChecked={isAllChecked} />
              ))}
            </DetailedListComponent>
          ) : (
            <div className={styles.defaultContent}>
              <div className={styles.noOffers}>
                <p>
                  You haven't placed an{" "}
                  {tabFor.toLocaleLowerCase().slice(0, tabFor.length - 1)} yet.
                </p>
                <Button as="a" href="/artworks" size="small">
                  Browse Art
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OffersDashboard;
