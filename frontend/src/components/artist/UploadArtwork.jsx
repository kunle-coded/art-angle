import DropdownInput from "../../ui/DropdownInput";
import ProgressIndicator from "../../ui/ProgressIndicator";
import styles from "./UploadArtwork.module.css";
import Input from "../../ui/Input";
import ImageUpload from "../../ui/ImageUpload";

function UploadArtwork() {
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
                    <div className={styles.inputDisplay}>Other contents</div>
                  </div>
                </div>
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.contentHeader}>Artworks</div>
                  <div className={styles.inputItems}>
                    <DropdownInput title="Title">
                      <Input placeholder="Enter title" size="small" />
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
              <div className={styles.progressBtns}>
                <p>Save & Exit</p>
                <p>Continue</p>
              </div>
            </div>
            <div className={styles.wrap}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadArtwork;
