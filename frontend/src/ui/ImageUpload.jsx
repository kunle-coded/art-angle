import AddIcon from "../components/icons/AddIcon";
import styles from "./ImageUpload.module.css";

function ImageUpload() {
  return (
    <div className={styles.container}>
      <div className={styles.uploadArea}>
        {[...Array(6)].map((_, index) => (
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
            />
          </div>
        ))}
      </div>
      <div className={styles.uploadInfo}>Upload images</div>
      <div className={styles.uploadAr}></div>
    </div>
  );
}

export default ImageUpload;
