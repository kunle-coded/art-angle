import { useField } from "../../hooks/index";

import DropdownInput from "../../ui/DropdownInput";
import ProgressIndicator from "../../ui/ProgressIndicator";
import styles from "./UploadArtwork.module.css";
import Input from "../../ui/Input";
import ImageUpload from "../../ui/ImageUpload";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";

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

function UploadArtwork() {
  const [artworkDetails, setArtworkDetails] = useState([]);

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
    }
    resetTitle(e);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.progress}>
          <ProgressIndicator text="Image" number="1" current />
          <ProgressIndicator text="Description" number="2" />
          <ProgressIndicator text="Price & Details" number="3" />
          <ProgressIndicator text="Publish" number="4" last />
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
                  <div className={styles.contentHeader}>Artworks</div>
                  <div className={styles.inputItems}>
                    <DropdownInput title="Title">
                      <Input
                        placeholder="Enter title"
                        size="small"
                        {...titleProps}
                      />
                    </DropdownInput>
                    <DropdownInput title="Image">
                      <ImageUpload />
                    </DropdownInput>
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
