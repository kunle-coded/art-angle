import { useState } from "react";
import styles from "./UserDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  disableProfileDropdown,
  enableError,
  getGlobal,
  updateProfileDropdown,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import ImageIcon from "../icons/ImageIcon";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, logoutUser } from "../../slices/authSlice";
import { useLogoutMutation, useProfileQuery } from "../../slices/usersApiSlice";

function UserDropdown({ showDropdown, setHover }) {
  const [isError, setIsError] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { isProfileDropdown } = useSelector(getGlobal);
  const { userInfo } = useSelector(getAuth);

  const [logout] = useLogoutMutation();

  const {
    data,
    isSuccess,
    isError: isApiError,
    error,
  } = useProfileQuery(undefined, {
    skip: !shouldFetch,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleHover() {
    dispatch(updateProfileDropdown());
  }

  function handleHoverLeave() {
    dispatch(disableProfileDropdown());
  }

  function logoutHandler(e) {
    e.preventDefault();

    logout();
    dispatch(logoutUser());
    navigate("/");
  }

  function profileHandler(e) {
    e.preventDefault();

    if (userInfo.email) return;
    setShouldFetch(true);

    if (isSuccess) {
      setIsError(false);
    }

    if (isApiError) {
      const errMsg = error?.message;
      dispatch(updateSuccessMgs(errMsg || error));
      dispatch(enableError());
      setIsError(true);
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
              to={isError ? "" : "/artist/accounts/settings"}
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
