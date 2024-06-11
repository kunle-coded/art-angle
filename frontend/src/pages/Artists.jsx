import { artists } from "../data";
import PageHeaderArtists from "../ui/PageHeaderArtists";
import ScrollSection from "../components/sections/ScrollSection";
import ArtistCard from "../ui/ArtistCard";
import Section from "../components/sections/Section";

function Artists() {
  return (
    <div className="page">
      <PageHeaderArtists />

      <ScrollSection margin={false}>
        {artists.map(
          (artist, i) =>
            i < 4 && <ArtistCard key={artist.id} artist={artist} size="big" />
        )}
      </ScrollSection>
    </div>
  );
}

export default Artists;
