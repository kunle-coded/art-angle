import { useEffect, useState } from "react";
import styles from "./Slider.module.css";

const images = [
  {
    id: 0,
    url: "./sliderImg0.png",
    title: "When are young",
    artist: "Oladipupo Adesina",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2020",
  },
  {
    id: 1,
    url: "./sliderImg1.png",
    title: "Traditional Dancer",
    artist: "Uche Edozie",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2019",
  },
  {
    id: 2,
    url: "./sliderImg2.png",
    title: "Gaze of Hope",
    artist: "Durodola Yusuf",
    dimensions: "119.38cm x 91.44cm",
    medium: "Canvas on stretcher",
    year: "2019",
  },
  {
    id: 3,
    url: "./sliderImg3.png",
    title: "Our Neighbourhood",
    artist: "Divine Effiong",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2022",
  },
  {
    id: 4,
    url: "./sliderImg4.png",
    title: "Nolstagia Beauty I",
    artist: "Uzoma Samuel",
    dimensions: "119.38cm x 91.44cm",
    medium: "Painting on canvas",
    year: "2020",
  },
];

function Slider() {
  const [slides, setSlides] = useState(images);
  const [current, setCurrent] = useState(0);

  const transformX = `translateX(-${current * 100}%)`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prevCount) =>
        prevCount === slides.length - 1 ? 0 : prevCount + 1
      );
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [slides.length]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          <div
            className={styles.slideContainer}
            style={{ transform: transformX }}
          >
            {slides.map((image, index) => (
              <div
                key={image.id}
                className={`${current === index ? styles.active : ""} ${
                  styles.slide
                }`}
              >
                <div className={styles.sliderOverlay}></div>
                <img src={image.url} alt="" className={styles.image} />
                <div className={styles.metadata}>
                  <div className={styles.metaContent}>
                    <div className={styles.metaLeftCol}>
                      <div className={styles.metaTitle}>{image.title}</div>
                      <div className={styles.metaArtist}>{image.artist}</div>
                    </div>
                    <div className={styles.metaRightCol}>
                      <div className={styles.metaDate}>
                        Published: {image.year}
                      </div>
                      <span>-</span>
                      <div className={styles.metaMedium}>
                        Medium: {image.medium}
                      </div>
                      <span>-</span>
                      <div className={styles.metaDimension}>
                        Dimensions: {image.dimensions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
