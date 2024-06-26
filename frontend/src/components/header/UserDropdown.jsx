import { useState } from "react";
import styles from "./UserDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  disableProfileDropdown,
  getGlobal,
  updateProfileDropdown,
} from "../../reducers/globalSlice";
import ImageIcon from "../icons/ImageIcon";
import { Link } from "react-router-dom";

function UserDropdown({ showDropdown, setHover }) {
  const { isProfileDropdown } = useSelector(getGlobal);

  const dispatch = useDispatch();

  function handleHover() {
    dispatch(updateProfileDropdown());
  }

  function handleHoverLeave() {
    dispatch(disableProfileDropdown());
  }

  return (
    <div
      className={`${styles.dropdown} ${
        showDropdown || isProfileDropdown ? styles.show : ""
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
    >
      <h3 datatype="fullname">John Doe</h3>
      <Link to="/user/454675" className={styles.linkItem}>
        View Profile
      </Link>
      <div className={styles.linkItem}>Wishlist</div>
      <div className={styles.linkItem}>Favorite Artists</div>
      <div className={styles.linkItem}>Collections</div>
      <div className={styles.linkItem}>Orders</div>
      <div className={styles.linkItem}>Offers</div>
      <Link to="accounts/settings" className={styles.linkItem}>
        Account
      </Link>
      <span className={styles.line}></span>
      <div className={styles.artistSignup}>
        <div className={styles.iconWrapper}>
          <ImageIcon />
        </div>
        <span>Become an Artist</span>
      </div>
      <span className={styles.line}></span>
      <button className={styles.logout}>Log Out</button>
    </div>
  );
}

export default UserDropdown;
