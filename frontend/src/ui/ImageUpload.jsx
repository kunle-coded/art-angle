import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../components/icons/AddIcon";
import styles from "./ImageUpload.module.css";
import { getArtwork, updateImages } from "../slices/artworkSlice";
import { useUploadImageMutation } from "../slices/artworksApiSlice";
import MiniSpinner from "./MiniSpinner";
import { useState } from "react";
import { enableError, updateSuccessMgs } from "../slices/globalSlice";

function ImageUpload() {
  const [currentImage, setCurrentImage] = useState(0);

  const { images, title } = useSelector(getArtwork);

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const dispatch = useDispatch();

  async function imageUploadHandler(e) {
    setCurrentImage(e.target.tabIndex);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImage(formData).unwrap();
      const index = e.target.tabIndex;
      const url = res.url;
      dispatch(updateImages({ index, url }));
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadArea}>
        {images.map((image, index) =>
          image === "" ? (
            <div key={index} className={styles.imagePlaceholder}>
              <div className={styles.uploadIcon}>
                <AddIcon />
              </div>
              <input
                tabIndex={index}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className={styles.imageUpload}
                onChange={imageUploadHandler}
              />
              {isLoading && currentImage === index && (
                <div className={styles.spinnerContainer}>
                  <MiniSpinner />
                </div>
              )}
            </div>
          ) : (
            <img
              key={index}
              src={images[index]}
              alt={title}
              className={styles.userImage}
            />
          )
        )}
      </div>

      <div className={styles.uploadInfo}>Upload images</div>
      <div className={styles.uploadAr}></div>
    </div>
  );
}

export default ImageUpload;
