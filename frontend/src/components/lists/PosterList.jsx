import styles from "./PosterList.module.css";
import PageTitle from "../../ui/PageTitle";
import SmallPoster from "../../ui/SmallPoster";
import Spacer from "../../ui/Spacer";
import ListItems from "./ListItems";
import LinkButton from "../../ui/LinkButton";

function PosterList({ list = [], title = "", link, userType, artworkLink }) {
  return (
    <section className="section_basic">
      <PageTitle title={title} />
      <Spacer small />

      {list.length < 1 ? (
        <div className={styles.emptyList}>
          You currently have no {title.toLocaleLowerCase()}
        </div>
      ) : (
        <ListItems>
          {list.map((artwork) => (
            <SmallPoster
              key={artwork.id}
              artwork={artwork}
              type={userType}
              link={`${artworkLink}/${artwork.id}`}
            />
          ))}
        </ListItems>
      )}

      {list.length >= 1 && (
        <div className={styles.showMore}>
          <div className={styles.btnContainer}>
            <LinkButton link={link}>View All {title}</LinkButton>
          </div>
        </div>
      )}
    </section>
  );
}

export default PosterList;
