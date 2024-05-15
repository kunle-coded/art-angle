import Logo from "../../ui/Logo";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header({ onEnter, onLeave }) {
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
                  placeholder="Search by artist, style, etc."
                  className={styles.input}
                />
              </div>
              <div className={styles.searchIcon}>
                <svg
                  data-type="search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 23 21"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      width="8.903"
                      height="1.25"
                      x="14.747"
                      y="17.027"
                      fill="#333333"
                      rx=".625"
                      transform="rotate(45 19.198 17.652)"
                    ></rect>
                    <ellipse
                      cx="9.274"
                      cy="9.073"
                      stroke="#333333"
                      rx="8.774"
                      ry="8.573"
                    ></ellipse>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.utilityMenu}>
            <NavLink to="/login" className={styles.navlink}>
              Login/Sign up
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
              <div className={styles.cartCounter}>3</div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
