import styles from "./PageHeaderArtists.module.css";
import PageTitle from "./PageTitle";

const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

function PageHeaderArtists({ sectionId }) {
  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <PageTitle title="Featured Artists" />
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumb}>
              <li className={styles.breadcrumbItem}>
                <a aria-current="page" href={sectionId}>
                  Browse over 10,000 artists
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className={styles.artistsLetters}>
          <div className={styles.lettersContainer}>
            {alphabets.map((letter) => (
              <div key={letter} className={styles.lettersWrapper}>
                <a
                  key={letter}
                  href={`/artists/artists-starting-with-${letter.toLocaleLowerCase()}`}
                  className={styles.letterLink}
                >
                  <div className={styles.letter}>{letter}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderArtists;
