import { NavLink } from "react-router-dom";
import Logo from "../../ui/Logo";
import styles from "./Header.module.css";
import Modal from "../modal/Modal";
import Button from "../../ui/Button";
import CartIcon from "../icons/CartIcon";
import SearchIcon from "../icons/SearchIcon";
import Onboarding from "../auth/Onboarding";
import Intro from "../auth/Intro";
import Login from "../auth/Login";
import { useState } from "react";
import Signup from "../auth/Signup";

function Header({ onEnter, onLeave }) {
  const [isSignup, setIsSignup] = useState(false);

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
              Paintings
            </NavLink>
            <NavLink to="/sculptures" className={styles.navlink}>
              Sculptures
            </NavLink>
            <NavLink to="/photography" className={styles.navlink}>
              Photography
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
            <Modal>
              <Modal.Open opens="Login">
                <Button type="secondary" size="small">
                  Login
                </Button>
              </Modal.Open>
              <Modal.Window name="Login">
                <Login />
              </Modal.Window>

              <Modal.Open opens="Signup">
                <Button size="small">Signup</Button>
              </Modal.Open>

              <Modal.Window name="Signup">
                <Intro />
              </Modal.Window>
            </Modal>

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
