import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";
import {
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

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

function ArtworkOverview() {
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isPriceEdit, setIsPriceEdit] = useState(false);
  const [multiEditData, setMultiEditData] = useState({});

  const { userInfo } = useSelector(getAuth);
  const { images } = useSelector(getArtwork);

  const { id } = useParams();
  const { data: artwork, isLoading } = useUserSingleArtworkQuery(id);
  const [update, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateMutation();

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
    { id: 0, editable: true, label: "Medium", value: artwork.medium },
    {
      id: 1,
      editable: true,
      label: "Materials",
      value: artwork.materials.join(", "),
    },
    {
      id: 2,
      editable: true,
      label: "Styles",
      value: artwork.styles.join(", "),
    },
  ];
  const price = [
    { id: 0, editable: true, label: "Artwork Price", value: artwork.price },
    { id: 1, editable: false, label: "Your Commission", value: artwork.price },
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
      value: `${artwork.totalWeight}kg`,
    },
  ];

  async function handleDescEdit() {
    setIsDescEdit((prevState) => !prevState);

    const isEmpty = emptyObject(multiEditData);

    if (isDescEdit && !isEmpty) {
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

  function handleMultiEdit(data) {
    setMultiEditData((prevState) => {
      return { ...prevState, ...data };
    });
  }

  function handlePriceEdit() {
    setIsPriceEdit((prevState) => !prevState);
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
                      <button className={styles.deleteBtn}>
                        Delete Artwork
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.inputItems}>
                    <EditImage
                      images={images.length >= 1 ? images : artwork.images}
                    />
                    <Spacer />
                    <EditDescripion
                      title="Description"
                      isEdit={isDescEdit}
                      onClick={handleDescEdit}
                    >
                      {isUpdateLoading && <Spinner />}
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
                      />

                      <StyledGrid
                        title="Dimensions"
                        singleValue={`${artwork.dimensions.width} W x ${artwork.dimensions.height} H x ${artwork.dimensions.depth} D in`}
                        isSingle
                        isEdit={isDescEdit}
                      />
                      <StyledGrid
                        title="Description"
                        singleValue={artwork.description}
                        isSingle
                        isTextArea
                        isEdit={isDescEdit}
                      />
                    </EditDescripion>
                    <Spacer />
                    <EditDescripion
                      title="Price & Details"
                      isEdit={isPriceEdit}
                      onClick={handlePriceEdit}
                    >
                      <StyledGrid
                        title="Status"
                        singleValue={artwork.availability}
                        selectList={["For Sale", "Not For Sale", "Sold"]}
                        selectPlaceholder="Select availability"
                        isSingle
                        isSelect
                        isEdit={isPriceEdit}
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
                      />
                      <StyledGrid
                        title="Weight & Packaging"
                        gridList={weightPkg}
                        isEdit={isPriceEdit}
                        isSelect
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
