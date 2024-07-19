import { useState } from "react";
import EditIcon from "../components/icons/EditIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ShareIcon from "../components/icons/ShareIcon";
import styles from "./UserProfile.module.css";
import { artworksThree, artworksTwo, artists } from "../data";
import DividerLine from "../ui/DividerLine";
import PosterList from "../components/lists/PosterList";
import CardList from "../components/lists/CardList";
import ArtistCardList from "../components/lists/ArtistCardList";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";
import {
  useUpdateProfileMutation,
  useUploadFileMutation,
} from "../slices/usersApiSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../slices/globalSlice";
import MiniSpinner from "../ui/MiniSpinner";

function UserProfile() {
  const [isEditHover, setIsEditHover] = useState(false);
  // const [file, setFile] = useState(null);

  const { userInfo } = useSelector(getAuth);

  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const dispatch = useDispatch();

  function handleClick(e) {
    console.log("clicked", e);
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];

    if (!file) {
      console.log("Please select a file first!");
      dispatch(updateSuccessMgs("Please select a file to upload!"));
      dispatch(enableError());
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData).unwrap();
      console.log("image succefully uploaded ", res);
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

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
                      {!userInfo.profileImageUrl && (
                        <div className={styles.avatarIcon}>
                          <ProfileIcon />
                        </div>
                      )}

                      {userInfo.profileImageUrl && (
                        <img
                          src={userInfo.profileImageUrl}
                          alt=""
                          className={styles.userImage}
                        />
                      )}

                      {isLoading && (
                        <div className={styles.spinnerContainer}>
                          <MiniSpinner />
                        </div>
                      )}

                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
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
                      userInfo.userType === "buyer" ? "Favorites" : "Artworks"
                    }
                    list={artworksThree.splice(0, 4)}
                    link={`/user/${userInfo.id}/favourites`}
                  />

                  <DividerLine />

                  <CardList
                    title={
                      userInfo.userType === "buyer" ? "Collections" : "Orders"
                    }
                    list={artworksTwo.splice(0, 4)}
                    link={`/user/${userInfo.id}/collections`}
                  />

                  {userInfo.userType === "buyer" && <DividerLine />}

                  {userInfo.userType === "buyer" && (
                    <ArtistCardList
                      title="Following"
                      list={artists.splice(0, 4)}
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
