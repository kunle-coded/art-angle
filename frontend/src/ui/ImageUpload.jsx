import { useSelector } from "react-redux";
import AddIcon from "../components/icons/AddIcon";
import styles from "./ImageUpload.module.css";
import { getArtwork } from "../slices/artworkSllice";

function ImageUpload() {
  const { images, title } = useSelector(getArtwork);

  function imageUploadHandler(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
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
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg, image/jpg"
                className={styles.imageUpload}
                onChange={imageUploadHandler}
              />
            </div>
          ) : (
            <img
              key={index}
              src={image}
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
