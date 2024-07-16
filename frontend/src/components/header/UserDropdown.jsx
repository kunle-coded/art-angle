import { useState } from "react";
import styles from "./UserDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  disableProfileDropdown,
  getGlobal,
  updateProfileDropdown,
} from "../../slices/globalSlice";
import ImageIcon from "../icons/ImageIcon";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";

function UserDropdown({ showDropdown, setHover }) {
  const { isProfileDropdown } = useSelector(getGlobal);
  const { userInfo } = useSelector(getAuth);

  const [logoutUser] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleHover() {
    dispatch(updateProfileDropdown());
  }

  function handleHoverLeave() {
    dispatch(disableProfileDropdown());
  }

  async function logoutHandler(e) {
    e.preventDefault();

    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`${styles.dropdown} ${
        showDropdown || isProfileDropdown ? styles.show : ""
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
    >
      <h3 datatype="fullname">
        {userInfo.firstname} {userInfo.lastname}
      </h3>
      <Link to={`/user/${userInfo.id}`} className={styles.linkItem}>
        View Profile
      </Link>
      {userInfo.userType === "buyer" && (
        <>
          <Link
            to={`user/${userInfo.id}/favorites`}
            className={styles.linkItem}
          >
            Favorites
          </Link>
          <Link
            to={`/user/${userInfo.id}/collections`}
            className={styles.linkItem}
          >
            Collections
          </Link>
          <Link to="/user/accounts/orders" className={styles.linkItem}>
            Orders
          </Link>
          <Link to="/user/accounts/offers" className={styles.linkItem}>
            Offers
          </Link>
          <div className={styles.linkItem}>Following</div>
          <Link to="/user/accounts/settings" className={styles.linkItem}>
            Account
          </Link>
        </>
      )}
      {userInfo.userType === "artist" && (
        <>
          <Link
            to={`/artist/${userInfo.id}/artworks`}
            className={styles.linkItem}
          >
            Artworks
          </Link>
          <Link
            to={`/artist/${userInfo.id}/artwork/upload`}
            className={styles.linkItem}
          >
            Upload Artwork
          </Link>
          <Link to="/artists/accounts/settings" className={styles.linkItem}>
            Account
          </Link>
        </>
      )}
      {userInfo.userType === "buyer" && <span className={styles.line}></span>}
      {userInfo.userType === "buyer" && (
        <div className={styles.artistSignup}>
          <div className={styles.iconWrapper}>
            <ImageIcon />
          </div>
          <span>Become an Artist</span>
        </div>
      )}
      <span className={styles.line}></span>
      <button className={styles.logout} onClick={logoutHandler}>
        Log Out
      </button>
    </div>
  );
}

export default UserDropdown;
