import { useField } from "../../hooks/index";

import DropdownInput from "../../ui/DropdownInput";
import ProgressIndicator from "../../ui/ProgressIndicator";
import styles from "./UploadArtwork.module.css";
import Input from "../../ui/Input";
import ImageUpload from "../../ui/ImageUpload";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import StyledSelect from "../../ui/StyledSelect";
import FilterButton from "../filter/FilterButton";
import {
  categoriesList,
  subjects,
  materials,
  medium,
  styles as artStyles,
} from "../../data";

const inputArray = [
  {
    id: 0,
    label: "Title",
    value: "Nostalgic Beauty",
  },
  {
    id: 1,
    label: "Category",
    value: "Contemporary Art",
  },
  {
    id: 2,
    label: "Subject",
    value: "Portraiture",
  },
  {
    id: 3,
    label: "Year",
    value: "2023",
  },
  {
    id: 4,
    label: "Medium",
    value: "Painting",
  },
  {
    id: 5,
    label: "Material",
    value: "Canvas",
  },
  {
    id: 6,
    label: "Styles",
    value: "Modern, Conceptual",
  },
  {
    id: 7,
    label: "Dimensions",
    value: "18 W x 10 H x 1 D in",
  },
];

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

function UploadArtwork() {
  const [artworkDetails, setArtworkDetails] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isContinue, setisContinue] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Artworks");

  const title = useField("text");
  const { onReset: resetTitle, ...titleProps } = title;

  function handleSaveContinue(e) {
    if (title.value) {
      const titleObj = {
        id: 0,
        label: "Title",
        value: title.value,
      };

      setArtworkDetails((details) => [...details, titleObj]);
      setCurrentStep((prevStep) => prevStep + 1);
      setisContinue(true);
    } else {
      setisContinue(false);
    }
    resetTitle(e);
  }

  useEffect(() => {
    if (currentStep === 2) {
      setCurrentTitle("Description");
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
                      {artworkDetails.map((input) => (
                        <div key={input.id} className={styles.inputData}>
                          <h5>{input.label}</h5>
                          <p>{input.value}</p>
                        </div>
                      ))}
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
                        <DropdownInput
                          title="Title"
                          inputValue={title.value}
                          isContinue={isContinue}
                        >
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
                          inputValue={title.value}
                          isContinue={isContinue}
                        >
                          <StyledSelect
                            label="Category"
                            placeholder="Select a category"
                            options={categoriesList}
                          />
                          <StyledSelect
                            label="Subject"
                            placeholder="Select a subject"
                            options={subjects}
                          />
                          <StyledSelect
                            label="Year"
                            placeholder="Select year produced"
                            options={years}
                          />
                        </DropdownInput>
                        <DropdownInput title="Medium, Materials & Styles">
                          <StyledSelect
                            label="Medium"
                            placeholder="Select or add a new medium"
                            options={medium}
                            isMultiple
                          />
                          <StyledSelect
                            label="Materials"
                            placeholder="Select or add a new material"
                            options={materials}
                            isMultiple
                          />
                          <StyledSelect
                            label="Styles"
                            placeholder="Select or add a new style"
                            options={artStyles}
                            isMultiple
                          />
                        </DropdownInput>
                        <DropdownInput title="Dimensions">
                          <Input
                            placeholder="Enter title"
                            size="small"
                            {...titleProps}
                          />
                        </DropdownInput>
                        <DropdownInput title="Keywords & Description">
                          <Input
                            placeholder="Enter title"
                            size="small"
                            {...titleProps}
                          />
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
