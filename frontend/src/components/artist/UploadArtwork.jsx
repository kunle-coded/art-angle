import { useDispatch, useSelector } from "react-redux";

import { useField } from "../../hooks/index";

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
} from "../../reducers/artworkSllice";

import DropdownInput from "../../ui/DropdownInput";
import ProgressIndicator from "../../ui/ProgressIndicator";
import styles from "./UploadArtwork.module.css";
import Input from "../../ui/Input";
import ImageUpload from "../../ui/ImageUpload";
import Button from "../../ui/Button";
import { useCallback, useEffect, useState } from "react";
import StyledSelect from "../../ui/StyledSelect";
import DimensionsInput from "../../ui/DimensionsInput";
import {
  categoriesList,
  subjects,
  materials,
  medium,
  styles as artStyles,
} from "../../data";
import InputSidebarDisplay from "../../ui/InputSidebarDisplay";
import ArtworkAvailability from "../price/ArtworkAvailability";
import LimitedEdition from "../price/LimitedEdition";
import DividerLine from "../../ui/DividerLine";
import WeightPackaging from "./WeightPackaging";
import ShippingAddress from "./ShippingAddress";
import PriceInputs from "../price/PriceInputs";

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

const descriptionTips = [
  "What/who inspired the work?",
  "What do you hope its viewers will feel/think?",
  "Why did you choose the medium, subject matter, style?",
];

function UploadArtwork() {
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
  } = useSelector(getArtwork);

  const dispatch = useDispatch();

  const title = useField("text");
  const { onReset: resetTitle, ...titleProps } = title;

  const displayDimensions = `${dimensions.width} W x ${dimensions.height} H x ${dimensions.depth} D in`;

  function handleSaveContinue(e) {
    if (title.value) {
      const titleObj = {
        id: 0,
        label: "Title",
        value: title.value,
      };

      // update artwork title
      dispatch(updateTitle(title.value));
      setCurrentStep((prevStep) => prevStep + 1);
    }
    resetTitle(e);

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
    }
  }, [currentStep]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.progress}>
          <ProgressIndicator
            text="Image"
            number="1"
            current={currentStep >= 1}
          />
          <ProgressIndicator
            text="Description"
            number="2"
            current={currentStep >= 2}
          />
          <ProgressIndicator
            text="Price & Details"
            number="3"
            current={currentStep >= 3}
          />
          <ProgressIndicator
            text="Publish"
            number="4"
            last
            current={currentStep >= 4}
          />
        </div>

        <div className={styles.uploadArea}>
          <div className={styles.uploadAreaInner}>
            <div className={styles.uploadAreaGrid}>
              <div className={styles.sidebarColumn}>
                <div className={styles.sidebarContainer}>
                  <div className={styles.backBtn}>Back to Artworks</div>
                  <div className={styles.sidebarContent}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.inputDisplay}>
                      {artworkTitle && (
                        <InputSidebarDisplay
                          label="Title"
                          item={artworkTitle}
                        />
                      )}
                      {category && (
                        <InputSidebarDisplay label="Category" item={category} />
                      )}
                      {subject && (
                        <InputSidebarDisplay label="Subject" item={subject} />
                      )}
                      {year && <InputSidebarDisplay label="Year" item={year} />}
                      {artworkMedium.length >= 1 && (
                        <InputSidebarDisplay
                          label="Medium"
                          item={artworkMedium.join(", ")}
                        />
                      )}
                      {artworkMaterials.length >= 1 && (
                        <InputSidebarDisplay
                          label="Materials"
                          item={artworkMaterials.join(", ")}
                        />
                      )}
                      {artworkStyles.length >= 1 && (
                        <InputSidebarDisplay
                          label="Styles"
                          item={artworkStyles.join(", ")}
                        />
                      )}
                      {dimensions.width && dimensions.height && (
                        <InputSidebarDisplay
                          label="Dimensions"
                          item={displayDimensions}
                        />
                      )}
                      {isShowMore && keywords.length >= 1 && (
                        <InputSidebarDisplay
                          label="Keywords"
                          item={keywords.join(", ")}
                        />
                      )}
                      {isShowMore && description && (
                        <InputSidebarDisplay
                          label="Description"
                          item={description}
                        />
                      )}

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
                    {currentStep === 2 && (
                      <>
                        <DropdownInput
                          title="Category, Subject, Year"
                          isCheck={false}
                        >
                          <StyledSelect
                            label="Category"
                            placeholder="Select a category"
                            options={categoriesList}
                            onSelect={handleSelect}
                          />
                          <StyledSelect
                            label="Subject"
                            placeholder="Select a subject"
                            options={subjects}
                            onSelect={handleSelect}
                          />
                          <StyledSelect
                            label="Year"
                            placeholder="Select year produced"
                            options={years}
                            onSelect={handleSelect}
                          />
                        </DropdownInput>
                        <DropdownInput title="Medium, Materials & Styles">
                          <StyledSelect
                            label="Medium"
                            placeholder="Select or add a new medium"
                            options={medium}
                            isMultiple
                            onSelect={handleSelect}
                          />
                          <StyledSelect
                            label="Materials"
                            placeholder="Select or add a new material"
                            options={materials}
                            isMultiple
                            onSelect={handleSelect}
                          />
                          <StyledSelect
                            label="Styles"
                            placeholder="Select or add a new style"
                            options={artStyles}
                            isMultiple
                            onSelect={handleSelect}
                          />
                        </DropdownInput>
                        <DropdownInput title="Dimensions">
                          <DimensionsInput onInput={handleSelect} />
                        </DropdownInput>
                        <DropdownInput title="Keywords & Description">
                          <StyledSelect
                            label="Keywords"
                            placeholder="Enter 5-12 keywords"
                            note="Please provide from 5 to 12 keywords. Tagging your artwork with keywords allows collectors to find your artwork more easily. It's best to enter simple, descriptive words that describe the key visual elements of the work, such as color, subject matter, and artistic style. You may enter or paste keywords that are distinct and at least 2-character long. We recommend providing keywords in English."
                            info="Press 'Enter' to save a keyword"
                            isInput
                            isMultiple
                            onSelect={handleSelect}
                          />
                          <StyledSelect
                            label="Description"
                            placeholder="Enter artwork description"
                            note="Collectors tend to appreciate works more if they know the 'story' behind them, so be sure to write informative artwork descriptions Great descriptions not only provide useful information (e.g. physical texture, whether hanging hardware is included, quality of materials), but they also answer questions like:"
                            tips={descriptionTips}
                            isTextArea
                            onSelect={handleSelect}
                          />
                        </DropdownInput>
                      </>
                    )}
                    {currentStep === 3 && (
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
                          <DropdownInput title="Limited Edition">
                            <LimitedEdition artworkTitle={artworkTitle} />
                          </DropdownInput>
                        )}
                        <DropdownInput title="Weight and Packaging">
                          <WeightPackaging />
                        </DropdownInput>
                        <DropdownInput title="Shipping Address">
                          <ShippingAddress />
                        </DropdownInput>
                        <DropdownInput title="Price">
                          <PriceInputs />
                        </DropdownInput>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className={styles.progressBtnWrapper}>
              <div className={styles.uploadAreaGrid}>
                <div className={styles.sidebarColumn}></div>
                <div className={styles.contentColumn}>
                  <div className={styles.progressBtns}>
                    <Button type="secondary" size="small">
                      Save & Exit
                    </Button>
                    <Button size="small" onClick={handleSaveContinue}>
                      Save & Continue
                    </Button>
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

export default UploadArtwork;
