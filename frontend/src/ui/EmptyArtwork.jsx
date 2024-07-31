import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";

import styles from "./EmptyArtwork.module.css";

import LinkButton from "./LinkButton";

function EmptyArtwork() {
  const { userInfo } = useSelector(getAuth);

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <div className={styles.headingContainer}>
              You Have No Artworks. Start Uploading.
            </div>
          </div>
          <div className={styles.bodyContainer}>
            <div className={styles.bodyInner}>
              <div className={styles.bodyText}>
                See our tutorial on how to upload your artworks first, or just
                get started with your first upload.
              </div>

              <div className={styles.btnContainer}>
                <LinkButton
                  link="/artwork/upload/tutorial"
                  type="secondary"
                  size="small"
                >
                  See Tutorial
                </LinkButton>
                <LinkButton
                  link={`/artist/${userInfo?.id}/artwork/upload`}
                  size="small"
                >
                  Upload Artwork
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnContaine}></div>
      <div className={styles.containe}></div>
    </div>
  );
}

export default EmptyArtwork;
