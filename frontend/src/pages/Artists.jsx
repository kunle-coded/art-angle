import { artists, categories } from "../data";
import PageHeaderArtists from "../ui/PageHeaderArtists";
import ScrollSection from "../components/sections/ScrollSection";
import ArtistCard from "../ui/ArtistCard";
import Section from "../components/sections/Section";
import CardContainer from "../ui/CardContainer";
import Spacer from "../ui/Spacer";
import AdBanner from "../components/ads/AdBanner";

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

      <Section title={categories[0].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i < 4 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>

      <Section title={categories[1].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 4 &&
              i < 8 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>

      <Section title={categories[2].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 8 &&
              i < 12 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>
      <Section title={categories[3].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 12 &&
              i < 16 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>
      <Section title={categories[4].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 16 &&
              i < 20 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>
      <Section title={categories[5].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 20 &&
              i < 24 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>
      <Section title={categories[6].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 24 &&
              i < 28 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>
      <Section title={categories[7].title} subtitle="View category">
        <CardContainer>
          {artists.map(
            (artist, i) =>
              i >= 28 &&
              i <= 32 && <ArtistCard key={artist.id} artist={artist} grid />
          )}
        </CardContainer>
      </Section>

      <AdBanner />

      <Spacer />
    </div>
  );
}

export default Artists;
