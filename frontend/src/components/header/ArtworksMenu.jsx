import { Link } from "react-router-dom";
import styles from "./ArtworksMenu.module.css";
import MegaColumn from "./MegaColumn";

function ArtworksMenu() {
  const categoryItems = [
    "Contemporary Art",
    "Emerging Art",
    "Abstract Art",
    "Impressionist and Modern Art",
    "Minimalism",
    "Pop Art",
    "Street Art",
  ];
  const mediumItems = [
    "Painting",
    "Prints",
    "Works on Paper",
    "Photography",
    "Sculpture",
    "Ceramics",
    "NFTs",
  ];
  const priceItems = [
    "Finds Under ₦250k",
    "Finds Under ₦500k",
    "Finds Under ₦1m",
    "Finds Under ₦2m",
    "Finds Under ₦3m",
  ];

  return (
    <div>
      <div className={styles.menuWrapper}>
        <div className={styles.menu}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Link to="/artworks">
                <div className={styles.imageBox}>
                  <div className={styles.imageText}>Artworks</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <MegaColumn columnTitle="Categories" menuItems={categoryItems} />
        <MegaColumn columnTitle="Mediums" menuItems={mediumItems} />
        <MegaColumn columnTitle="Price" menuItems={priceItems} />
      </div>
    </div>
  );
}

export default ArtworksMenu;
