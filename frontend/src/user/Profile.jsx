import { useState } from "react";
import EditIcon from "../components/icons/EditIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ShareIcon from "../components/icons/ShareIcon";
import styles from "./Profile.module.css";
import { artworksThree, artworks } from "../data";
import ListItems from "../components/lists/ListItems";
import SmallCard from "../ui/SmallCard";
import PageTitle from "../ui/PageTitle";
import Spacer from "../ui/Spacer";
import DividerLine from "../ui/DividerLine";
import SmallPoster from "../ui/SmallPoster";
import PosterList from "../components/lists/PosterList";
import CardList from "../components/lists/CardList";

function Profile() {
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
