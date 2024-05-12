import Logo from "../../ui/Logo";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Header({ onEnter, onLeave }) {
  const [isInput, setIsInput] = useState(false);

  const handleInput = () => {
    setIsInput((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <nav className={styles.navbar}>
          <ul className={styles.mainMenu}>
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
          </ul>
        </nav>
        <nav className={styles.navbar}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <div className={styles.searchField}>
                <input
                  type="text"
                  placeholder="Search by artist, style, theme, etc."
                  className={isInput ? styles.input : ""}
                />
              </div>
              <div className={styles.searchIcon} onClick={handleInput}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4.00003C6.93913 4.00003 5.92172 4.42146 5.17157 5.17161C4.42143 5.92175 4 6.93917 4 8.00003C4 9.0609 4.42143 10.0783 5.17157 10.8285C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8285C11.5786 10.0783 12 9.0609 12 8.00003C12 6.93917 11.5786 5.92175 10.8284 5.17161C10.0783 4.42146 9.06087 4.00003 8 4.00003ZM2 8.00003C1.99988 7.05574 2.22264 6.12475 2.65017 5.28278C3.0777 4.4408 3.69792 3.71163 4.4604 3.15456C5.22287 2.59749 6.10606 2.22825 7.03815 2.07687C7.97023 1.92549 8.92488 1.99625 9.82446 2.28338C10.724 2.57052 11.5432 3.06594 12.2152 3.72933C12.8872 4.39272 13.3931 5.20537 13.6919 6.10117C13.9906 6.99697 14.0737 7.95063 13.9343 8.88459C13.795 9.81855 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6949C17.5094 17.8803 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9862C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8279 3.44869 12.0631 2.87572 11.1224C2.30276 10.1817 1.99979 9.10147 2 8.00003Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
          </div>

          <ul className={styles.utilityMenu}>
            <NavLink to="/login" className={styles.navlink}>
              Login/Register
            </NavLink>
            <div className={styles.cartContainer}>
              <NavLink to="/cart" className={styles.cartLink}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
              <div className={styles.cartCounter}>2</div>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
