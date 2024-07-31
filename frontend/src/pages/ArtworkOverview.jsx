import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";
import {
  useDeleteArtworkMutation,
  useUpdateMutation,
  useUserSingleArtworkQuery,
} from "../slices/artworksApiSlice";
import { getArtwork } from "../slices/artworkSlice";

import { SHIPPING_COST } from "../constants/constants";

import {
  categoriesList,
  subjects,
  materials,
  medium,
  styles as artStyles,
} from "../data";

import styles from "./ArtworkOverview.module.css";
import BackToPageButton from "../ui/BackToPageButton";
import ShareIcon from "../components/icons/ShareIcon";
import EditImage from "../components/artist/EditImage";
import Spacer from "../ui/Spacer";
import EditDescripion from "../components/artist/EditDescripion";
import StyledGrid from "../ui/StyledGrid";
import Spinner from "../ui/Spinner";
import { emptyObject } from "../hooks";
import { enableError, updateSuccessMgs } from "../slices/globalSlice";
import Modal from "../components/modal/Modal";
import ConfirmDelete from "../components/messages/ConfirmDelete";

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

function ArtworkOverview() {
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isPriceEdit, setIsPriceEdit] = useState(false);
  const [currLoading, setCurrLoading] = useState(0);
  const [multiEditData, setMultiEditData] = useState({});

  const { userInfo } = useSelector(getAuth);
  const { images } = useSelector(getArtwork);

  const { id } = useParams();
  const { data: artwork, isLoading } = useUserSingleArtworkQuery(id);
  const [update, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateMutation();
  const [deleteArtwork, { isLoading: isDeleteLoading }] =
    useDeleteArtworkMutation();

  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  const subCatYr = [
    {
      id: 0,
      editable: true,
      label: "Subject",
      value: artwork.subject,
      options: subjects,
      placeholder: "Select subject",
    },
    {
      id: 1,
      editable: true,
      label: "Category",
      value: artwork.category,
      options: categoriesList,
      placeholder: "Select category",
    },
    {
      id: 2,
      editable: true,
      label: "Year",
      value: artwork.published,
      options: years,
      placeholder: "Select year",
    },
  ];
  const medMatSty = [
    {
      id: 0,
      editable: true,
      label: "Medium",
      value: artwork.medium,
      options: medium,
      placeholder: "Select medium",
      multiple: false,
    },
    {
      id: 1,
      editable: true,
      label: "Materials",
      value: artwork.materials.join(", "),
      options: materials,
      placeholder: "Select material",
      multiple: true,
    },
    {
      id: 2,
      editable: true,
      label: "Styles",
      value: artwork.styles.join(", "),
      options: artStyles,
      placeholder: "Select style",
      multiple: true,
    },
  ];
  const price = [
    { id: 0, editable: true, label: "Artwork Price", value: artwork.price },
    {
      id: 1,
      editable: false,
      label: "Your Commission",
      value: Number(artwork.price) * 0.6,
    },
    { id: 2, editable: false, label: "Shipping Cost", value: SHIPPING_COST },
    {
      id: 3,
      editable: false,
      label: "Listed Price",
      value: artwork.totalPrice,
    },
  ];
  const weightPkg = [
    {
      id: 0,
      editable: true,
      label: "Packaging Type",
      value: artwork.packagingType,
      options: ["Tube", "Box", "Crate"],
      placeholder: "Select packaging type",
    },
    {
      id: 1,
      editable: true,
      label: "Shipping Weight",
      value: artwork.totalWeight,
    },
  ];

  async function updateArtwork() {
    const isEmpty = emptyObject(multiEditData);

    if (!isEmpty) {
      try {
        await update({ id, value: multiEditData }).unwrap();
        if (isSuccess) {
          setMultiEditData({});
        }
      } catch (err) {
        dispatch(updateSuccessMgs(err?.data?.message || err.error));
        dispatch(enableError());
        console.log(err);
      }
    }
  }

  function handleDescEdit() {
    setIsDescEdit((prevState) => !prevState);
    setCurrLoading(1);

    if (isDescEdit) {
      updateArtwork();
    }
  }

  function handleMultiEdit(data) {
    setMultiEditData((prevState) => {
      return { ...prevState, ...data };
    });
  }

  function handlePriceEdit() {
    setIsPriceEdit((prevState) => !prevState);
    setCurrLoading(2);

    if (isPriceEdit) {
      updateArtwork();
    }
  }

  function handleCancelEdit() {
    if (isDescEdit) {
      setIsDescEdit(false);
      setMultiEditData({});
    } else if (isPriceEdit) {
      setIsPriceEdit(false);
      setMultiEditData({});
    }
  }

  async function deleteArtworkHandler() {
    try {
      await deleteArtwork(id).unwrap();
    } catch (err) {
      dispatch(updateSuccessMgs(err?.data?.message || err.error));
      dispatch(enableError());
      console.log(err);
    }
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.gridArea}>
              <aside className={styles.sidebarColumn}>
                <div className={styles.sidebarContainer}>
                  <BackToPageButton
                    label="Back to Artworks"
                    link={`/artist/${userInfo.id}/artworks`}
                  />

                  <div className={styles.sidebarContent}>
                    <div className={styles.artworkImage}>
                      <img
                        className={styles.image}
                        src={artwork?.images[0]}
                        alt=""
                      />
                    </div>
                    <div className={styles.artworkTitle}>{artwork.title}</div>
                    <div className={styles.metaContainer}>
                      <div className={styles.metaWrapper}>
                        Views
                        <span>0</span>
                      </div>
                      <div className={styles.metaWrapper}>
                        Favorites
                        <span>0</span>
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      <a href="/" className={styles.shareBtn}>
                        <div className={styles.iconContainer}>
                          <ShareIcon />
                        </div>
                        <div className={styles.btnText}>Share</div>
                      </a>
                    </div>
                    <div className={styles.deleteBtnWrapper}>
                      <Modal>
                        <Modal.Open opens="delete_artwork">
                          <button className={styles.deleteBtn}>
                            Delete Artwork
                          </button>
                        </Modal.Open>
                        <Modal.Window name="delete_artwork">
                          <ConfirmDelete
                            message="Are you sure you want to delete this artwork?"
                            onConfirm={deleteArtworkHandler}
                          />
                        </Modal.Window>
                      </Modal>
                    </div>
                  </div>
                </div>
              </aside>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.inputItems}>
                    {isDeleteLoading && <Spinner />}
                    <EditImage
                      images={images.length >= 1 ? images : artwork.images}
                    />
                    <Spacer />
                    <EditDescripion
                      title="Description"
                      isEdit={isDescEdit}
                      onClick={handleDescEdit}
                      onCancel={handleCancelEdit}
                    >
                      {isUpdateLoading && !isDescEdit && currLoading === 1 && (
                        <Spinner />
                      )}
                      <StyledGrid
                        title="Subject, Category, Year"
                        gridList={subCatYr}
                        isEdit={isDescEdit}
                        onEdit={handleMultiEdit}
                        isSelect
                      />
                      <StyledGrid
                        title="Mediums, Materials, Styles"
                        gridList={medMatSty}
                        isEdit={isDescEdit}
                        onEdit={handleMultiEdit}
                        isSelect
                      />

                      <StyledGrid
                        title="Dimensions"
                        singleValue={`${artwork.dimensions.width} W x ${artwork.dimensions.height} H x ${artwork.dimensions.depth} D in`}
                        isSingle
                        isDimensions
                        dimensions={artwork.dimensions}
                        isEdit={isDescEdit}
                        onEdit={handleMultiEdit}
                      />
                      <StyledGrid
                        title="Description"
                        singleValue={artwork.description}
                        isSingle
                        isTextArea
                        isEdit={isDescEdit}
                        onEdit={handleMultiEdit}
                      />
                    </EditDescripion>
                    <Spacer />
                    <EditDescripion
                      title="Price & Details"
                      isEdit={isPriceEdit}
                      onClick={handlePriceEdit}
                      onCancel={handleCancelEdit}
                    >
                      {isUpdateLoading && !isPriceEdit && currLoading === 2 && (
                        <Spinner />
                      )}
                      <StyledGrid
                        title="Status"
                        singleValue={artwork.availability}
                        selectList={["For Sale", "Not For Sale", "Sold"]}
                        selectPlaceholder="Select availability"
                        isSingle
                        isSelect
                        isEdit={isPriceEdit}
                        onEdit={handleMultiEdit}
                      />
                      {artwork.editions === "Limited Edition" && (
                        <StyledGrid
                          title="Quantity"
                          singleValue={artwork.availableForSale}
                          isSingle
                          isEdit={isPriceEdit}
                        />
                      )}
                      <StyledGrid
                        title="Price"
                        gridList={price}
                        isNumber
                        isEdit={isPriceEdit}
                        onEdit={handleMultiEdit}
                      />
                      <StyledGrid
                        title="Weight & Packaging"
                        gridList={weightPkg}
                        isEdit={isPriceEdit}
                        isSelect
                        onEdit={handleMultiEdit}
                      />
                    </EditDescripion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkOverview;
