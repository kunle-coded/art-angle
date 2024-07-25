import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImages } from "../../slices/artworkSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../../slices/artworksApiSlice";

import styles from "./EditImage.module.css";
import EditHeader from "../../ui/EditHeader";
import AddIcon from "../icons/AddIcon";
import TrashIcon from "../icons/TrashIcon";
import { useParams } from "react-router-dom";
import Modal from "../modal/Modal";
import ConfirmDelete from "../messages/ConfirmDelete";

function EditImage({ images }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [uploadImage] = useUploadImageMutation();
  const [deleteImage] = useDeleteImageMutation();

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

  async function imageUploadHandler(e) {
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

  async function imageDeleteHandler(imageToDelete) {
    try {
      const res = await deleteImage({ id, url: imageToDelete }).unwrap();
      dispatch(updateSuccessMgs(res));
      dispatch(enableSuccess());
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

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
                  {isEdit && (
                    <Modal>
                      <Modal.Open opens="confirm_delete">
                        <div
                          className={`${styles.deleteWrapper} ${
                            isDelete && currentItem === i
                              ? styles.showDelete
                              : ""
                          }`}
                        >
                          <div className={styles.deleteIcon}>
                            <TrashIcon />
                          </div>
                        </div>
                      </Modal.Open>
                      <Modal.Window name="confirm_delete">
                        <ConfirmDelete
                          message="Are you sure you want to delete this image?"
                          onConfirm={() => imageDeleteHandler(image)}
                        />
                      </Modal.Window>
                    </Modal>
                  )}
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
              <div className={styles.newImageText}>
                Add {images.length >= 1 ? "additional" : ""} image
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditImage;
