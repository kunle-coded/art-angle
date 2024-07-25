import { useState } from "react";
import EditHeader from "../../ui/EditHeader";
import styles from "./EditImage.module.css";
import AddIcon from "../icons/AddIcon";
import TrashIcon from "../icons/TrashIcon";

function EditImage({ images }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function handleEdit() {
    setIsEdit((prevState) => !prevState);
  }

  function handleEnter(index) {
    setCurrentItem(index);
    setIsDelete(true);
  }
  function handleLeave() {
    setIsDelete(false);
  }

  const imagesArr = [
    {
      id: 0,
      imgUrl: "/assets/artists/temi-wynston.webp",
    },
    {
      id: 1,
      imgUrl: "/assets/artists/kehinde-omolayo.webp",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <EditHeader heading="Images" isEdit={isEdit} onClick={handleEdit} />

        <div className={styles.imagesWrapper}>
          {images.map(
            (image, i) =>
              image !== "" && (
                <div
                  key={image}
                  className={styles.imageContainer}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <img src={image} alt="" className={styles.image} />
                  <div
                    className={`${styles.deleteWrapper} ${
                      isDelete && currentItem === i ? styles.showDelete : ""
                    }`}
                  >
                    <div className={styles.deleteIcon}>
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              )
          )}
          {isEdit && (
            <div className={styles.newImageWrapper}>
              <div className={styles.newImageIconWrapper}>
                <div className={styles.newImageIcon}>
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
              <div className={styles.newImageText}>Add additional image</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditImage;
