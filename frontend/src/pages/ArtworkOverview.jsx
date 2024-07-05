import styles from "./ArtworkOverview.module.css";
import BackToPageButton from "../ui/BackToPageButton";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import ShareIcon from "../components/icons/ShareIcon";

function ArtworkOverview() {
  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.gridArea}>
              <div className={styles.sidebarColumn}>
                <div className={styles.sidebarContainer}>
                  <BackToPageButton label="Back to Artworks" />

                  <div className={styles.sidebarContent}>
                    <div className={styles.artworkImage}>
                      <img
                        className={styles.image}
                        src="/assets/artists/temi-wynston.webp"
                        alt=""
                      />
                    </div>
                    <div className={styles.artworkTitle}>Nostalgic Beauty</div>
                    <div className={styles.metaContainer}>
                      <div className={styles.metaWrapper}>
                        Views
                        <span>0</span>
                      </div>
                      <div className={styles.metaWrapper}>
                        Following
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
              </div>
              <div className={styles.contentColumn}>
                <div className={styles.contentContainer}>
                  <div className={styles.inputItems}>Artwork Overview</div>
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
