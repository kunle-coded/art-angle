import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ArtistCard.module.css";
import Button from "./Button";

function ArtistCard({ artist, size = "small", grid = false, span = false }) {
  const [isFollow, setIsFollow] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.clientWidth;
      setImageHeight(height);
    }
  }, []);

  const handleFollow = (e) => {
    setIsFollow((prevState) => !prevState);
  };

  return (
    <li
      ref={cardRef}
      className={`card  ${grid ? styles.gridCard : styles.cardContainer} ${
        grid && span ? styles.smallGrid : ""
      }`}
    >
      <Link className={styles.link}>
        <div className={styles.card}>
          <div
            className={`${size === "big" ? styles.imageBig : styles.image} ${
              grid ? styles.gridImage : ""
            }`}
            style={grid && span ? { height: imageHeight } : null}
          >
            <img src={`${artist.imgUrl}`} alt="" className={styles.img} />
          </div>
          <div className={styles.artistDetails}>
            <div className={styles.artistInfo}>
              <div
                className={size === "small" ? styles.smallName : styles.name}
              >
                {artist.name}
              </div>
              <div
                className={size === "small" ? styles.smallMeta : styles.meta}
              >
                {!grid && !span && `${artist.nationality}, `}
                <span>{artist.category}</span>
              </div>
            </div>
            <div className={styles.follow}>
              <Button
                type={isFollow ? "primary" : "tertiary"}
                size={grid && span ? "smallest" : "small"}
                onClick={handleFollow}
              >
                {isFollow ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ArtistCard;
