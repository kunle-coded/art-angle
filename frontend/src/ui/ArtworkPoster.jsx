import { Link } from "react-router-dom";
import styles from "./ArtworkPoster.module.css";
import { useRef, useState } from "react";
import Heart from "./Heart";
import formatCurrency from "../helpers/formatCurrency";

function ArtworkPoster({ poster }) {
  const [paddingBottom, setPaddingBottom] = useState("100%");
  const [imageStyle, setImageStyle] = useState({
    transformOrigin: "center center",
    transition:
      "transform 0.15s ease 0s, transform-origin 100ms ease 0s, opacity 0.25s ease 0s",
    transform: "scale(1)",
    opacity: 1,
  });

  const imageRef = useRef(null);

  const handleImageLoad = () => {
    const image = imageRef.current;
    if (image) {
      const aspectRatio = (image.naturalHeight / image.naturalWidth) * 100;
      setPaddingBottom(`${aspectRatio}%`);
    }
  };

  function handleMouseEnter(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    const transformOrigin = `${offsetX}px ${offsetY}px`;

    setImageStyle((prevStyle) => ({
      ...prevStyle,
      transformOrigin,
      transform: "scale(1.75",
    }));
  }

  function handleMouseMove(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    const transformOrigin = `${offsetX}px ${offsetY}px`;

    setImageStyle((prevStyle) => ({
      ...prevStyle,
      transformOrigin,
    }));
  }

  function handleMouseLeave(e) {
    setImageStyle((prevStyle) => ({
      ...prevStyle,
      transformOrigin: "center center",
      transform: "scale(1)",
    }));
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={styles.imageContainer}
        style={{ paddingBottom: paddingBottom }}
      >
        <Link aria-label={poster.title} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageCompact}>
              <img
                ref={imageRef}
                src={poster.images[0]}
                alt={`${poster.title} by ${poster.artist}`}
                className={styles.image}
                style={imageStyle}
                onLoad={handleImageLoad}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onContextMenu={handleContextMenu}
              />
            </div>
          </div>
        </Link>
      </div>

      <Link className={styles.posterContent}>
        <div className={styles.posterInfo}>
          <div className={styles.posterTitle}>
            <div className={styles.title}>{poster.title}</div>
            <Heart />
          </div>
          <div className={styles.posterName}>
            {poster.artist}, <span>{poster.published}</span>
          </div>
          <div className={styles.posterMedium}>{poster.medium}</div>
          <div
            className={`${styles.posterPrice} ${
              poster.availability !== "For Sale" ? styles.posterPriceAlt : ""
            }`}
          >
            {poster.availability === "For Sale"
              ? formatCurrency(poster.price)
              : poster.availability}
          </div>
        </div>
      </Link>
      <div style={{ height: "40px" }}></div>
    </div>
  );
}

export default ArtworkPoster;
