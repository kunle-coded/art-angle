import styles from "./CardList.module.css";
import LinkButton from "../../ui/LinkButton";
import PageTitle from "../../ui/PageTitle";
import SmallCard from "../../ui/SmallCard";
import Spacer from "../../ui/Spacer";
import ListItems from "./ListItems";

function CardList({ list = [], title = "" }) {
  return (
    <section className="section_basic">
      <PageTitle title={title} />
      <Spacer small />
      <ListItems>
        {list.map((artwork) => (
          <SmallCard
            key={artwork.id}
            title={artwork.title}
            name={artwork.artist}
            price={artwork.price}
            url={artwork.url}
          />
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

export default CardList;
