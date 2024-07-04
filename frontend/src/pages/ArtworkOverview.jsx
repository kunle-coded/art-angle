import { useDispatch, useSelector } from "react-redux";

import { useField } from "../hooks/index";

import {
  getArtwork,
  updateTitle,
  updateCategory,
  updateSubject,
  updateYear,
  updateMaterials,
  updateMedium,
  updateStyles,
  updateDimensions,
  updateDescription,
  updateKeywords,
} from "../reducers/artworkSllice";

import DropdownInput from "../ui/DropdownInput";
import styles from "./ArtworkOverview.module.css";
import Input from "../ui/Input";
import ImageUpload from "../ui/ImageUpload";
import Button from "../ui/Button";
import { useCallback, useEffect, useState } from "react";
import StyledSelect from "../ui/StyledSelect";
import DimensionsInput from "../ui/DimensionsInput";
import {
  categoriesList,
  subjects,
  materials,
  medium,
  styles as artStyles,
} from "../data";
import InputSidebarDisplay from "../ui/InputSidebarDisplay";
import ArtworkAvailability from "../components/price/ArtworkAvailability";
import LimitedEdition from "../components/price/LimitedEdition";
import DividerLine from "../ui/DividerLine";
import WeightPackaging from "../components/artist/WeightPackaging";
import ShippingAddress from "../components/artist/ShippingAddress";
import PriceInputs from "../components/price/PriceInputs";
import BackToPageButton from "../ui/BackToPageButton";

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

const descriptionTips = [
  "What/who inspired the work?",
  "What do you hope its viewers will feel/think?",
  "Why did you choose the medium, subject matter, style?",
];

function ArtworkOverview() {
  const [isImage, setIsImage] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLimitedEdition, setIsLimitedEdition] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("Artworks");

  const {
    title: artworkTitle,
    category,
    subject,
    year,
    medium: artworkMedium,
    materials: artworkMaterials,
    styles: artworkStyles,
    dimensions,
    keywords,
    description,
    editions,
    totalRun,
    availableForSale,
    weight,
    framed,
    frameDimensions,
    packagingType,
    packagingWeight,
    shippingAddress,
    price,
  } = useSelector(getArtwork);

  const dispatch = useDispatch();

  const title = useField("text");
  const { onReset: resetTitle, ...titleProps } = title;

  const displayDimensions = `${dimensions.width} W x ${dimensions.height} H x ${dimensions.depth} D in`;

  function handleSaveContinue(e) {
    if (currentStep === 1) {
      // update artwork title
      dispatch(updateTitle(title.value));
      setCurrentStep((prevStep) => prevStep + 1);
      setIsImage(true);
    }
    // resetTitle(e);

    if (currentStep === 2) {
      if (
        category &&
        subject &&
        year &&
        artworkMedium.length >= 1 &&
        artworkMaterials.length >= 1 &&
        artworkStyles.length >= 1 &&
        dimensions.width &&
        dimensions.height &&
        description &&
        keywords.length >= 1
      ) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }

    if (currentStep === 3) {
      if (
        ((editions === "Limited Edition" && totalRun && availableForSale) ||
          editions === "One-of-a-kind") &&
        weight &&
        packagingWeight &&
        ((framed && frameDimensions.width && frameDimensions.height) ||
          !framed) &&
        shippingAddress.city &&
        shippingAddress.state &&
        shippingAddress.country &&
        packagingType &&
        price
      ) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  }

  const handleSelect = useCallback(
    (label, selection) => {
      if (label === "Category") {
        dispatch(updateCategory(selection));
      } else if (label === "Subject") {
        dispatch(updateSubject(selection));
      } else if (label === "Year") {
        dispatch(updateYear(selection));
      } else if (label === "Medium") {
        dispatch(updateMedium(selection));
      } else if (label === "Materials") {
        dispatch(updateMaterials(selection));
      } else if (label === "Styles") {
        dispatch(updateStyles(selection));
      } else if (label === "Dimensions") {
        dispatch(updateDimensions(selection));
      } else if (label === "Keywords") {
        dispatch(updateKeywords(selection));
      } else if (label === "Description") {
        dispatch(updateDescription(selection));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentStep === 2) {
      setCurrentTitle("Description");
    } else if (currentStep === 3) {
      setCurrentTitle("Price & Details");
    } else if (currentStep === 4) {
      setCurrentTitle("Publish");
    }
  }, [currentStep]);

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.gridArea}>
              <div className={styles.sidebarColumn}>
                <div className={styles.sidebarContainer}>
                  <div className={styles.backBtn}>
                    <BackToPageButton label="Back to Artworks" />
                  </div>
                  <div className={styles.sidebarContent}>
                    {isImage && (
                      <div className={styles.artworkImage}>
                        <img
                          className={styles.image}
                          src="/assets/artists/temi-wynston.webp"
                          alt=""
                        />
                      </div>
                    )}

                    <div className={styles.inputDisplay}>
                      <div className={styles.btnContainer}>
                        <button
                          className={styles.showMoreBtn}
                          onClick={() =>
                            setIsShowMore((prevState) => !prevState)
                          }
                        >
                          Show {isShowMore ? "Less" : "More"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.contentHeader}>{currentTitle}</div>
                  <div className={styles.inputItems}>
                    {currentStep === 1 && (
                      <>
                        <DropdownInput title="Title" isCheck={title.value}>
                          <Input
                            placeholder="Enter title"
                            size="small"
                            {...titleProps}
                          />
                        </DropdownInput>
                        <DropdownInput title="Image">
                          <ImageUpload />
                        </DropdownInput>
                      </>
                    )}

                    {currentStep >= 3 && (
                      <>
                        <ArtworkAvailability title="Available For Sale" />
                        <div style={{ marginTop: "10px" }}></div>
                        <ArtworkAvailability
                          title="Editions"
                          type="editions"
                          setEditions={setIsLimitedEdition}
                        />
                        <DividerLine />
                        {isLimitedEdition && (
                          <DropdownInput
                            title="Limited Edition"
                            isCheck={totalRun && availableForSale}
                          >
                            <LimitedEdition artworkTitle={artworkTitle} />
                          </DropdownInput>
                        )}
                        <DropdownInput
                          title="Weight and Packaging"
                          isCheck={
                            weight &&
                            packagingType &&
                            packagingWeight &&
                            ((framed &&
                              frameDimensions.width &&
                              frameDimensions.height) ||
                              !framed)
                          }
                        >
                          <WeightPackaging />
                        </DropdownInput>
                        <DropdownInput
                          title="Shipping Address"
                          isCheck={
                            shippingAddress.city &&
                            shippingAddress.state &&
                            shippingAddress.country
                          }
                        >
                          <ShippingAddress />
                        </DropdownInput>
                        <DropdownInput title="Price" isCheck={price}>
                          <PriceInputs />
                        </DropdownInput>
                      </>
                    )}
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
