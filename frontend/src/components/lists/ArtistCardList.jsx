import styles from "./ArtistCardList.module.css";
import LinkButton from "../../ui/LinkButton";
import PageTitle from "../../ui/PageTitle";
import Spacer from "../../ui/Spacer";
import ListItems from "./ListItems";
import ArtistCard from "../../ui/ArtistCard";

function ArtistCardList({ list = [], title = "" }) {
  return (
    <section className="section_basic">
      <PageTitle title={title} />
      <Spacer small />
      <ListItems>
        {list.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} grid span />
        ))}
      </ListItems>

      <div className={styles.showMore}>
        <div className={styles.btnContainer}>
          <LinkButton>View All {title}</LinkButton>
        </div>
      </div>
    </section>
  );
}

export default ArtistCardList;
