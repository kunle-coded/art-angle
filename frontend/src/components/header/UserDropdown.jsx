import { useState } from "react";
import styles from "./UserDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLogout,
  disableProfileDropdown,
  enableError,
  getGlobal,
  updateProfileDropdown,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import ImageIcon from "../icons/ImageIcon";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, logout, setCredentials } from "../../slices/authSlice";
import {
  useLogoutMutation,
  useProfileMutation,
} from "../../slices/usersApiSlice";

function UserDropdown({ showDropdown, setHover }) {
  const [isError, setIsError] = useState(false);
  const { isProfileDropdown } = useSelector(getGlobal);
  const { userInfo } = useSelector(getAuth);

  const [logoutUser] = useLogoutMutation();
  const [profile] = useProfileMutation();

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
      dispatch(activateLogout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function profileHandler(e) {
    e.preventDefault();

    if (userInfo.email) return;

    try {
      const res = await profile().unwrap();
      dispatch(setCredentials(res));
      setIsError(false);
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
      setIsError(true);
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

      {userInfo.userType === "buyer" && (
        <ul className={styles.dropdownMenuItems} onClick={profileHandler}>
          <li>
            <Link
              to={isError ? "" : `/user/${userInfo.id}`}
              className={styles.linkItem}
            >
              View Profile
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : `user/${userInfo.id}/favorites`}
              className={styles.linkItem}
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : `/user/${userInfo.id}/collections`}
              className={styles.linkItem}
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : "/user/accounts/orders"}
              className={styles.linkItem}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : "/user/accounts/offers"}
              className={styles.linkItem}
            >
              Offers
            </Link>
          </li>
          {/* <li>
            <div className={styles.linkItem}>Following</div>
          </li> */}
          <li>
            <Link
              to={isError ? "" : "/user/accounts/settings"}
              className={styles.linkItem}
            >
              Account
            </Link>
          </li>
        </ul>
      )}
      {userInfo.userType === "artist" && (
        <ul className={styles.dropdownMenuItems} onClick={profileHandler}>
          <li>
            <Link
              to={isError ? "" : `/user/${userInfo.id}`}
              className={styles.linkItem}
            >
              View Profile
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : `/artist/${userInfo.id}/artworks`}
              className={styles.linkItem}
            >
              Artworks
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : `/artist/${userInfo.id}/artwork/upload`}
              className={styles.linkItem}
            >
              Upload Artwork
            </Link>
          </li>
          <li>
            <Link
              to={isError ? "" : "/artists/accounts/settings"}
              className={styles.linkItem}
            >
              Account
            </Link>
          </li>
        </ul>
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
