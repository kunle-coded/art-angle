import { useState } from "react";
import EditIcon from "../components/icons/EditIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ShareIcon from "../components/icons/ShareIcon";
import styles from "./Profile.module.css";

function Profile() {
  const [isShareHover, setIsShareHover] = useState(false);

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
                    <input type="file" className={styles.imageUpload} />
                    <div className={styles.editAvatar}>
                      <div className={styles.editIcon}>
                        <EditIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className={styles.userName}>Kunle Ronald</h3>
                <hr className={styles.dividerLine}></hr>
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
                <hr className={styles.dividerLine}></hr>
              </div>
            </div>
            <div className={styles.contentColumn}>
              <h1>Contents</h1>
            </div>
            <h1>Profile</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
