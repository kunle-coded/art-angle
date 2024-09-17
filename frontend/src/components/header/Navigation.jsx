import { useState } from "react";
import Header from "./Header";
import MegaMenu from "./MegaMenu";
import ArtistsMenu from "./ArtistsMenu";
import MegaColumn from "./MegaColumn";
import MegaFooter from "./MegaFooter";

const featuredList = ["Top Sellers", "Emerging Artists", "Popular Artists"];
const newList = ["New This Week", "Trending Now"];
const artistsList = [
  "Oladipupo Adesina",
  "Uche Edozie",
  "Durodola Yusuf",
  "Uzoma Samuel",
  "Divine Efiong",
];

const categoryList = [
  "Contemporary Art",
  "Emerging Art",
  "Abstract Art",
  "Impressionist and Modern Art",
  "Minimalism",
  "Pop Art",
  "Street Art",
];

const mediumList = [
  "Painting",
  "Prints",
  "Works on Paper",
  "Photography",
  "Sculpture",
  "Ceramics",
  "NFTs",
];
const priceList = [
  "Finds Under ₦250k",
  "Finds Under ₦500k",
  "Finds Under ₦1m",
  "Finds Under ₦2m",
  "Finds Under ₦3m",
];

function Navigation({ isIntersecting }) {
  const [isArtist, setIsArtist] = useState(false);
  const [isArtwork, setIsArtwork] = useState(false);
  const [isArtworkEnter, setIsArtworkEnter] = useState(false);
  const [isArtistEnter, setIsArtistEnter] = useState(false);

  const handleHover = (event) => {
    const target = event.target.textContent;

    if (target === "Artists") {
      setIsArtist(true);
    }
    if (target === "Artworks") {
      setIsArtwork(true);
    }
  };

  const handleLeave = () => {
    setIsArtwork(false);
    setIsArtist(false);
  };

  const handleArtworkMegaEnter = () => {
    setIsArtworkEnter(true);
  };
  const handleArtworkMegaLeave = () => {
    setIsArtworkEnter(false);
  };

  const handleArtistMegaEnter = () => {
    setIsArtistEnter(true);
  };
  const handleArtistMegaLeave = () => {
    setIsArtistEnter(false);
  };

  const handleArtworkLinkClick = () => {
    setIsArtworkEnter(false);
    setIsArtistEnter(false);
  };
  const handleArtistLinkClick = () => {};

  return (
    <>
      <Header onEnter={(e) => handleHover(e)} onLeave={() => handleLeave()} />

      <MegaMenu
        isShow={isArtwork}
        isEnter={isArtworkEnter}
        onEnter={handleArtworkMegaEnter}
        onLeave={handleArtworkMegaLeave}
      >
        <ArtistsMenu link="artworks">
          <MegaColumn
            type="artworks"
            columnTitle="Categories"
            menuItems={categoryList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn
            type="artworks"
            columnTitle="Mediums"
            menuItems={mediumList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn
            type="artworks"
            columnTitle="Price"
            menuItems={priceList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn linkText="View all Artworks" />
        </ArtistsMenu>
      </MegaMenu>

      <MegaMenu
        isShow={isArtist}
        isEnter={isArtistEnter}
        onEnter={handleArtistMegaEnter}
        onLeave={handleArtistMegaLeave}
      >
        <ArtistsMenu link="artists">
          <MegaColumn
            columnTitle="Featured"
            menuItems={featuredList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn
            columnTitle="New on Art Angle"
            menuItems={newList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn
            columnTitle="Trending Artists"
            menuItems={artistsList}
            onLink={handleArtworkLinkClick}
          />
          <MegaColumn linkText="View all Artists" onLink={handleLeave} />
          <MegaFooter />
        </ArtistsMenu>
      </MegaMenu>
    </>
  );
}

export default Navigation;
