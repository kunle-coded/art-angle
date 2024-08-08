import { useQuery } from "@tanstack/react-query";

import Poster from "../ui/Poster";
import PosterBlock from "../ui/PosterBlock";
import Section from "../components/sections/Section";
import Slider from "../components/slider/Slider";
import ScrollSection from "../components/sections/ScrollSection";
import CategoryCard from "../ui/CategoryCard";
import { categories, artworks, artists, events } from "../data";
import TabbedSection from "../components/sections/TabbedSection";
import SmallCard from "../ui/SmallCard";
import AdBanner from "../components/ads/AdBanner";
import ArtistCard from "../ui/ArtistCard";
import BigCard from "../ui/BigCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { closeLogin, getGlobal, openLogin } from "../slices/globalSlice";
import { getAuth } from "../slices/authSlice";
import {
  useAllArtworksQuery,
  useArtworksByPriceMutation,
  useFeaturedArtworksQuery,
  useNewArtworksQuery,
} from "../slices/artworksApiSlice";

function Homepage() {
  const { data: allArtworks } = useAllArtworksQuery();
  const { data: featuredArtworks } = useFeaturedArtworksQuery();
  const { data: newArtworks } = useNewArtworksQuery();

  const { userInfo } = useSelector(getAuth);
  const { priceSort } = useSelector(getGlobal);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes("login")) {
      if (userInfo) {
        navigate("/");
        return;
      }
      dispatch(openLogin("Login"));
    } else {
      dispatch(closeLogin());
    }
  }, [dispatch, navigate, pathname, userInfo]);

  return (
    <div className="page">
      <Slider />
      <Section title="Featured artworks">
        <PosterBlock>
          {featuredArtworks?.map((artwork) => (
            <Poster key={artwork.id} poster={artwork} />
          ))}
        </PosterBlock>
      </Section>

      <ScrollSection title="Shop by Category" align={true} titleSize="big">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} title={cat.title} imgUrl={cat.url} />
        ))}
      </ScrollSection>

      <Section
        title="New on Art Angle"
        subtitle="Explore Emerging Trends"
        link="/emerging-arts"
      >
        <PosterBlock>
          {newArtworks?.map((artwork) => (
            <Poster key={artwork.id} poster={artwork} />
          ))}
        </PosterBlock>
      </Section>

      <TabbedSection />

      <AdBanner />

      <ScrollSection title="Trending Artists">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </ScrollSection>

      <Section
        title="Fairs & Events"
        subtitle="View All Fairs & Events"
        link="/events"
      >
        <PosterBlock>
          {events.map((event) => (
            <BigCard key={event.id} artwork={event} />
          ))}
        </PosterBlock>
      </Section>
    </div>
  );
}

export default Homepage;
