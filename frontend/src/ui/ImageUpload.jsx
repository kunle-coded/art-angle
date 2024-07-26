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
      const url = res.url;
      dispatch(updateImages(url));
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadArea}>
        {images.map((image, index) => (
          <img
            key={index}
            src={images[index]}
            alt={title}
            className={styles.userImage}
          />
        ))}
        {images.length <= 5 && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.uploadIcon}>
              <AddIcon />
            </div>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className={styles.imageUpload}
              onChange={imageUploadHandler}
            />
            {isLoading && (
              <div className="spinner_container">
                <MiniSpinner />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.uploadInfo}>Upload images</div>
      <div className={styles.uploadAr}></div>
    </div>
  );
}

export default ImageUpload;
