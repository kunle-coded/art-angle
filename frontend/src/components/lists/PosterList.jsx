import styles from "./PosterList.module.css";
import PageTitle from "../../ui/PageTitle";
import SmallPoster from "../../ui/SmallPoster";
import Spacer from "../../ui/Spacer";
import ListItems from "./ListItems";
import LinkButton from "../../ui/LinkButton";

function PosterList({ list = [], title = "", link }) {
  return (
    <section className="section_basic">
      <PageTitle title={title} />
      <Spacer small />
      <ListItems>
        {list.map((artwork) => (
          <SmallPoster key={artwork.id} artwork={artwork} />
        ))}
      </ListItems>

      <div className={styles.showMore}>
        <div className={styles.btnContainer}>
          <LinkButton link={link}>View All {title}</LinkButton>
        </div>
      </div>
    </section>
  );
}

export default PosterList;
