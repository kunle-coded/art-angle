import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtwork,
  resetArtwork,
  updateImages,
} from "../../slices/artworkSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import {
  useDeleteImageMutation,
  useUpdateMutation,
  useUploadImageMutation,
  useUserSingleArtworkQuery,
} from "../../slices/artworksApiSlice";
import { getAuth } from "../../slices/authSlice";

import styles from "./EditImage.module.css";
import EditHeader from "../../ui/EditHeader";
import AddIcon from "../icons/AddIcon";
import TrashIcon from "../icons/TrashIcon";
import Modal from "../modal/Modal";
import ConfirmDelete from "../messages/ConfirmDelete";
import MiniSpinner from "../../ui/MiniSpinner";

function EditImage({ images }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: artwork } = useUserSingleArtworkQuery(id);
  const { images: imagesToUpload } = useSelector(getArtwork);
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: isDeleteLoading }] =
    useDeleteImageMutation();
  const [update] = useUpdateMutation();

  async function handleEdit() {
    setIsEdit((prevState) => !prevState);

    try {
      if (isEdit) {
        const isImages = imagesToUpload.length >= 1;
        console.log("image in state-before", isImages);
        if (isImages) {
          console.log("image in state-after", isImages);
          await update({ id, value: { images: imagesToUpload } });
          dispatch(resetArtwork());
        }
      }
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

  function handleEnter(index) {
    setCurrentItem(index);
    setIsDelete(true);
  }

  function handleLeave() {
    setIsDelete(false);
  }

  // console.log(artwork);

  async function imageUploadHandler(e) {
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

  async function imageDeleteHandler(imageToDelete) {
    try {
      const res = await deleteImage({ id, url: imageToDelete }).unwrap();

      dispatch(updateSuccessMgs(res.message));
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
                  {isDeleteLoading && i && (
                    <div className="spinner_container">
                      <MiniSpinner />
                    </div>
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
