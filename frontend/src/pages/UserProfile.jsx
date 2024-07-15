import { useState } from "react";
import EditIcon from "../components/icons/EditIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ShareIcon from "../components/icons/ShareIcon";
import styles from "./UserProfile.module.css";
import { artworksThree, artists } from "../data";
import DividerLine from "../ui/DividerLine";
import PosterList from "../components/lists/PosterList";
import CardList from "../components/lists/CardList";
import ArtistCardList from "../components/lists/ArtistCardList";
import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";

function UserProfile() {
  const [isEditHover, setIsEditHover] = useState(false);

  const { userInfo } = useSelector(getAuth);

  function handleClick(e) {
    console.log("clicked", e);
  }
  function handleAvatarUpload(e) {
    if (e.target) {
      console.log("upload", e.target.files[0]);
    }
  }

  console.log(userInfo);

  return (
    <div className="page">
      <div className="container">
        <section className="section_block">
          <div className={styles.wrapper}>
            <div className={styles.profileContainer}>
              <div className={styles.profileColumn}>
                <div className={styles.profileWrapper}>
                  <div className={styles.profileImage}>
                    <div className={styles.avatar}>
                      <div className={styles.avatarIcon}>
                        <ProfileIcon />
                      </div>

                      {/* <img
                      src="../boss-lady.png"
                      alt=""
                      className={styles.userImage}
                    /> */}

                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg, image/jpg"
                        className={styles.imageUpload}
                        onMouseEnter={() => setIsEditHover(true)}
                        onMouseLeave={() => setIsEditHover(false)}
                        onChange={handleAvatarUpload}
                      />

                      <div
                        className={`${styles.editAvatar} ${
                          isEditHover ? styles.showEdit : ""
                        }`}
                      >
                        <div className={styles.editIcon}>
                          <EditIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className={styles.userName}>
                    {userInfo?.firstname} {userInfo?.lastname}
                  </h3>
                  <DividerLine />
                  <div className={styles.utilityContainer}>
                    <a href="/follow" className={styles.followingLink}>
                      <span>{userInfo?.favouriteArtists?.length}</span>{" "}
                      {userInfo.userType === "buyer"
                        ? "Following"
                        : "Followers"}
                    </a>
                    <div className={styles.shareWrapper}>
                      <button className={styles.shareBtn}>
                        <div className={styles.shareIcon}>
                          <ShareIcon />
                        </div>
                        <p className={styles.shareText}>Share</p>
                      </button>
                    </div>
                  </div>
                  <DividerLine />
                </div>
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <PosterList
                    title={
                      userInfo.userType === "buyer" ? "Wishlist" : "Artworks"
                    }
                    list={artworksThree}
                  />

                  <DividerLine />

                  <CardList
                    title={
                      userInfo.userType === "buyer" ? "Collections" : "Orders"
                    }
                    list={artworksThree}
                  />

                  {userInfo.userType === "buyer" && <DividerLine />}

                  {userInfo.userType === "buyer" && (
                    <ArtistCardList
                      title="Favorite Artists"
                      list={artists.splice(0, 6)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
