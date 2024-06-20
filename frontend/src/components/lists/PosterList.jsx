import PageTitle from "../../ui/PageTitle";
import SmallPoster from "../../ui/SmallPoster";
import Spacer from "../../ui/Spacer";
import ListItems from "./ListItems";

function PosterList({ list = [], title = "" }) {
  return (
    <section className="section_basic">
      <PageTitle title={title} />
      <Spacer small />
      <ListItems>
        {list.map((artwork) => (
          <SmallPoster key={artwork.id} artwork={artwork} />
        ))}
      </ListItems>
    </section>
  );
}

export default PosterList;
