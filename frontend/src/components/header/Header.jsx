import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../reducers/userSlice";

import Logo from "../../ui/Logo";
import styles from "./Header.module.css";
import Modal from "../modal/Modal";
import Button from "../../ui/Button";
import CartIcon from "../icons/CartIcon";
import SearchIcon from "../icons/SearchIcon";
import UserIcon from "../icons/UserIcon";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserDropdown from "./UserDropdown";

function Header({ onEnter, onLeave }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useSelector(getUser);

  useEffect(() => {
    if (user.email && user.password) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

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
            {isLogin && (
              <div className={styles.userContainer}>
                <div className={styles.userWrapper}>
                  <button
                    className={styles.profileName}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span datatype="fullname">John Doe</span>
                    <span datatype="initials">JD</span>
                  </button>

                  <UserDropdown showDropdown={isHovered} />
                </div>
              </div>
            )}

            {!isLogin && (
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
