import { Link } from "react-router-dom";
import styles from "./ArtistCard.module.css";
import Button from "./Button";
import { useState } from "react";

function ArtistCard({ artist }) {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = (e) => {
    setIsFollow((prevState) => !prevState);
  };

  return (
    <li className={styles.cardContainer}>
      <Link className={styles.link}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img
              src={`../../assets/images/${artist.imgUrl}`}
              alt=""
              className={styles.img}
            />
          </div>
          <div className={styles.artistDetails}>
            <div className={styles.artistInfo}>
              <div className={styles.name}>{artist.name}</div>
              <div className={styles.meta}>
                {artist.nationality}, <span>{artist.category}</span>
              </div>
            </div>
            <div className={styles.follow}>
              <Button
                type={isFollow ? "primary" : "secondary"}
                size="small"
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
