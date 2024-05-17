import Poster from "../ui/Poster";
import PosterBlock from "../ui/PosterBlock";
import Section from "../ui/Section";
import Slider from "../ui/Slider";
import styles from "./Homepage.module.css";
import { artworks } from "../data";
import ScrollBlock from "../ui/ScrollBlock";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <Slider />
      <Section title="Featured artworks">
        <PosterBlock>
          {artworks.map((artwork) => (
            <Poster key={artwork.id} poster={artwork} />
          ))}
        </PosterBlock>
      </Section>

      <ScrollBlock></ScrollBlock>
    </div>
  );
}

export default Homepage;
