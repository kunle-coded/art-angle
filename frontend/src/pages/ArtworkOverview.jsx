import { useState } from "react";

import styles from "./ArtworkOverview.module.css";
import BackToPageButton from "../ui/BackToPageButton";
import ShareIcon from "../components/icons/ShareIcon";
import EditImage from "../components/artist/EditImage";
import Spacer from "../ui/Spacer";
import EditDescripion from "../components/artist/EditDescripion";
import StyledGrid from "../ui/StyledGrid";
import { useParams } from "react-router-dom";
import { useUserSingleArtworkQuery } from "../slices/artworksApiSlice";
import Spinner from "../ui/Spinner";
import { SHIPPING_COST } from "../constants/constants";

function ArtworkOverview() {
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isPriceEdit, setIsPriceEdit] = useState(false);

  const { id } = useParams();
  const { data: artwork, isLoading } = useUserSingleArtworkQuery(id);
  console.log(artwork);

  if (isLoading) {
    return <Spinner />;
  }

  const subCatYr = [
    { id: 0, label: "Subject", value: artwork.subject },
    { id: 1, label: "Category", value: artwork.category },
    { id: 2, label: "Year", value: "2022" },
  ];
  const medMatSty = [
    { id: 0, label: "Medium", value: artwork.medium },
    { id: 1, label: "Materials", value: artwork.materials.join(", ") },
    { id: 2, label: "Styles", value: artwork.styles.join(", ") },
  ];
  const price = [
    { id: 0, label: "Artwork Price", value: artwork.price },
    { id: 1, label: "Your Commission", value: artwork.price },
    { id: 2, label: "Shipping Cost", value: SHIPPING_COST },
    { id: 3, label: "Listed Price", value: artwork.totalPrice },
  ];
  const weightPkg = [
    { id: 0, label: "Packaging Type", value: artwork.packagingType },
    { id: 1, label: "Shipping Weight", value: `${artwork.totalWeight}kg` },
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
                  <BackToPageButton label="Back to Artworks" />

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
                    <EditImage images={artwork.images} />
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
                        singleValue="18 W x 10 H x 1 D in"
                        isSingle
                        isEdit={isDescEdit}
                      >
                        <div>18 W x 10 H x 1 D in</div>
                      </StyledGrid>
                      <StyledGrid
                        title="Description"
                        singleValue="Inspired by the landscape of the southwest and a modern aesthetic this image shows a juxtaposition between the chaotic cactus spines at odds with the minimalistic background highlighting the natural beauty of the plant.
I have taken this photo with a Canon EOS 7D within my studio. The photo will be printed on museum... READ MORE"
                        isSingle
                        isTextArea
                        isEdit={isDescEdit}
                      >
                        <div>
                          Inspired by the landscape of the southwest and a
                          modern aesthetic this image shows a juxtaposition
                          between the chaotic cactus spines at odds with the
                          minimalistic background highlighting the natural
                          beauty of the plant. I have taken this photo with a
                          Canon EOS 7D within my studio. The photo will be
                          printed on museum... READ MORE
                        </div>
                      </StyledGrid>
                    </EditDescripion>
                    <Spacer />
                    <EditDescripion
                      title="Price & Details"
                      isEdit={isPriceEdit}
                      onClick={handlePriceEdit}
                    >
                      <StyledGrid
                        title="Status"
                        singleValue="For Sale"
                        isSingle
                        isEdit={isPriceEdit}
                      >
                        <div>For Sale</div>
                      </StyledGrid>
                      <StyledGrid
                        title="Quantity"
                        singleValue="1"
                        isSingle
                        isEdit={isPriceEdit}
                      >
                        <div>1</div>
                      </StyledGrid>
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
