import { Link } from "react-router-dom";
import ProfileIcon from "../components/icons/ProfileIcon";
import styles from "./UserArtworks.module.css";
import Spacer from "../ui/Spacer";
import ArtworkGrid from "../ui/ArtworkGrid";
import ArtworkGridColumn from "../ui/ArtworkGridColumn";
import ArtworkPoster from "../ui/ArtworkPoster";

import { artworksThree } from "../data";

function UserArtworks() {
  const style1 = {
    flex: "1",
    minWidth: "0",
    marginRight: "20px",
  };
  const style2 = {
    flex: "1",
    minWidth: "0",
    marginRight: "0px",
  };

  return (
    <div className="page">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.headerWrapper}>
              <Link to="/user/34567" title="View profile of John Doe">
                <div className={styles.profileImage}>
                  <div className={styles.avatar}>
                    <div className={styles.avatarIcon}>
                      <ProfileIcon />
                    </div>
                  </div>
                </div>
              </Link>

              <div className={styles.headerText}>
                <h1 className={styles.heading}>John Doe's Favorites</h1>
                <Link to="/user/34567" className={styles.backBtn}>
                  <svg
                    viewBox="459.643 230 32.162 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M491.805 230l-32.162 20 32.162 20"
                      stroke="#000"
                      fill="none"
                    ></path>
                  </svg>
                  Back to profile
                </Link>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <Spacer />
              <ArtworkGrid>
                <ArtworkGridColumn style={style1}>
                  {artworksThree.map(
                    (artwork, i) =>
                      i <= 1 && (
                        <ArtworkPoster key={artwork.id} poster={artwork} />
                      )
                  )}
                </ArtworkGridColumn>
                <ArtworkGridColumn style={style1}>
                  {artworksThree.map(
                    (artwork, i) =>
                      i > 6 && (
                        <ArtworkPoster key={artwork.id} poster={artwork} />
                      )
                  )}
                </ArtworkGridColumn>
                <ArtworkGridColumn style={style2}>
                  {artworksThree.map(
                    (artwork, i) =>
                      i > 2 &&
                      i <= 3 && (
                        <ArtworkPoster key={artwork.id} poster={artwork} />
                      )
                  )}
                </ArtworkGridColumn>
              </ArtworkGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserArtworks;
