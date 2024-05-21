import { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import { slides as images } from "../../data";

function Slider() {
  const [slides, setSlides] = useState(images);
  const [current, setCurrent] = useState(0);

  const transformX = `translateX(-${current * 100}%)`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prevCount) =>
        prevCount === slides.length - 1 ? 0 : prevCount + 1
      );
    }, 30000);

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
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${current === index ? styles.active : ""} ${
                  styles.slide
                }`}
              >
                <div className={styles.sliderOverlay}></div>
                <img src={slide.url} alt="" className={styles.image} />
                <div className={styles.metadata}>
                  <div className={styles.metaContent}>
                    <div className={styles.metaLeftCol}>
                      <div className={styles.metaTitle}>{slide.title}</div>
                      <div className={styles.metaArtist}>{slide.artist}</div>
                    </div>
                    <div className={styles.metaRightCol}>
                      <div className={styles.metaDate}>
                        Published: {slide.year}
                      </div>
                      <span>-</span>
                      <div className={styles.metaMedium}>
                        Medium: {slide.medium}
                      </div>
                      <span>-</span>
                      <div className={styles.metaDimension}>
                        Dimensions: {slide.dimensions}
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
