import { useState } from "react";
import Header from "./Header";
import MegaMenu from "./MegaMenu";
import ArtistsMenu from "./ArtistsMenu";
import MegaColumn from "./MegaColumn";
import MegaFooter from "./MegaFooter";

function Navigation() {
  const [isArtist, setIsArtist] = useState(false);
  const [isArtwork, setIsArtwork] = useState(false);

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

  return (
    <>
      <Header onEnter={(e) => handleHover(e)} onLeave={() => handleLeave()} />

      <MegaMenu isShow={isArtwork}>
        <ArtistsMenu link="artworks">
          <MegaColumn columnTitle="Categories" menuItems={categoryList} />
          <MegaColumn columnTitle="Mediums" menuItems={mediumList} />
          <MegaColumn columnTitle="Price" menuItems={priceList} />
          <MegaColumn linkText="View all Artworks" />
        </ArtistsMenu>
      </MegaMenu>

      <MegaMenu isShow={isArtist}>
        <ArtistsMenu link="artists">
          <MegaColumn columnTitle="Featured" menuItems={featuredList} />
          <MegaColumn columnTitle="New on Art Angle" menuItems={newList} />
          <MegaColumn columnTitle="Trending Artists" menuItems={artistsList} />
          <MegaColumn linkText="View all Artists" />
          <MegaFooter />
        </ArtistsMenu>
      </MegaMenu>
    </>
  );
}

export default Navigation;
