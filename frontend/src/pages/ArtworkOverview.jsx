import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";
import { useUserSingleArtworkQuery } from "../slices/artworksApiSlice";

import { SHIPPING_COST } from "../constants/constants";

import styles from "./ArtworkOverview.module.css";
import BackToPageButton from "../ui/BackToPageButton";
import ShareIcon from "../components/icons/ShareIcon";
import EditImage from "../components/artist/EditImage";
import Spacer from "../ui/Spacer";
import EditDescripion from "../components/artist/EditDescripion";
import StyledGrid from "../ui/StyledGrid";
import Spinner from "../ui/Spinner";
import { getArtwork } from "../slices/artworkSlice";

function ArtworkOverview() {
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isPriceEdit, setIsPriceEdit] = useState(false);

  const { userInfo } = useSelector(getAuth);
  const { images } = useSelector(getArtwork);

  const { id } = useParams();
  const { data: artwork, isLoading } = useUserSingleArtworkQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  const subCatYr = [
    { id: 0, editable: true, label: "Subject", value: artwork.subject },
    { id: 1, editable: true, label: "Category", value: artwork.category },
    { id: 2, editable: true, label: "Year", value: "2022" },
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
      values: ["Tube", "Box", "Crate"],
    },
    {
      id: 1,
      editable: true,
      label: "Shipping Weight",
      value: `${artwork.totalWeight}kg`,
    },
  ];

  function handleDescEdit() {
    setIsDescEdit((prevState) => !prevState);
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
                      <StyledGrid
                        title="Subject, Category, Year"
                        gridList={subCatYr}
                        isEdit={isDescEdit}
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
                        selectPlaceholder="Select packaging type"
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
