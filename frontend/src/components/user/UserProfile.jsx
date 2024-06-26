import { useState } from "react";
import EditIcon from "../icons/EditIcon";
import ProfileIcon from "../icons/ProfileIcon";
import ShareIcon from "../icons/ShareIcon";
import styles from "./UserProfile.module.css";
import { artworksThree, artists } from "../../data";
import DividerLine from "../../ui/DividerLine";
import PosterList from "../lists/PosterList";
import CardList from "../lists/CardList";
import ArtistCardList from "../lists/ArtistCardList";

function UserProfile() {
  const [isEditHover, setIsEditHover] = useState(false);

  function handleClick(e) {
    console.log("clicked", e);
  }
  function handleAvatarUpload(e) {
    if (e.target) {
      console.log("upload", e.target.files[0]);
    }
  }

  return (
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
                <h3 className={styles.userName}>Kunle Ronald</h3>
                <DividerLine />
                <div className={styles.utilityContainer}>
                  <a href="/follow" className={styles.followingLink}>
                    <span>0</span> Following
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
                <PosterList title="Wishlist" list={artworksThree} />

                <DividerLine />

                <CardList title="Collections" list={artworksThree} />

                <DividerLine />

                <ArtistCardList
                  title="Favorite Artists"
                  list={artists.splice(0, 6)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
