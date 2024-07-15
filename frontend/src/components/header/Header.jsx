import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../slices/userSlice";

import Logo from "../../ui/Logo";
import styles from "./Header.module.css";
import Modal from "../modal/Modal";
import Button from "../../ui/Button";
import CartIcon from "../icons/CartIcon";
import SearchIcon from "../icons/SearchIcon";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserDropdown from "./UserDropdown";
import { getGlobal } from "../../slices/globalSlice";
import { getAuth } from "../../slices/authSlice";

function Header({ onEnter, onLeave }) {
  const [isHovered, setIsHovered] = useState(false);

  const { isProfileDropdown } = useSelector(getGlobal);
  const { userInfo } = useSelector(getAuth);

  function handleLeave(e) {
    setTimeout(() => {
      if (!isProfileDropdown) {
        setIsHovered(false);
      }
    }, 100);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <nav className={styles.navbar}>
          <div className={styles.mainMenu}>
            <NavLink
              to="/artists"
              className={styles.navlink}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Artists
            </NavLink>
            <NavLink
              to="/artworks"
              className={styles.navlink}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Artworks
            </NavLink>
            <NavLink to="/paintings" className={styles.navlink}>
              Galleries
            </NavLink>
            <NavLink to="/sculptures" className={styles.navlink}>
              Fairs & Events
            </NavLink>
            <NavLink to="/photography" className={styles.navlink}>
              Sell
            </NavLink>
          </div>
        </nav>
        <nav className={styles.utilityNavbar}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <div className={styles.searchField}>
                <input
                  id="search_artwork"
                  name="search_artwork"
                  type="text"
                  placeholder="Search by artist, style, theme, etc."
                  className={styles.input}
                />
              </div>
              <div className={styles.searchIcon}>
                <div className={styles.searchIconInner}>
                  <SearchIcon />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.utilityMenu}>
            {userInfo && (
              <div className={styles.userContainer}>
                <div>
                  <button
                    className={styles.profileName}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleLeave}
                  >
                    <span datatype="fullname">
                      {userInfo.firstname} {userInfo.lastname}{" "}
                    </span>
                    <span datatype="initials">JD</span>
                  </button>

                  <UserDropdown showDropdown={isHovered} />
                </div>
              </div>
            )}

            {!userInfo && (
              <Modal>
                <Modal.Open opens="Login">
                  <Button type="secondary" size="small">
                    Login
                  </Button>
                </Modal.Open>
                <Modal.Window name="Login">
                  <Login />
                </Modal.Window>

                <Modal.Open opens="intro">
                  <Button size="small">Signup</Button>
                </Modal.Open>

                <Modal.Window name="intro">
                  <Signup />
                </Modal.Window>
              </Modal>
            )}

            <a href="/cart" className={styles.cartLink}>
              <CartIcon />
            </a>
            {/* <div className={styles.cartContainer}>
              <div className={styles.cartCounter}>3</div>
            </div> */}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
