import AdBanner from "../components/ads/AdBanner";
import PointItem from "../components/selling/PointItem";
import SellingPoints from "../components/selling/SellingPoints";
import EarnIcon from "../components/icons/EarnIcon";
import ExpertIcon from "../components/icons/ExpertIcon";
import GlobalIcon from "../components/icons/GlobalIcon";
import StrategyComponent from "../components/selling/StrategyComponent";
import SellingSteps from "../components/selling/SellingSteps";
import ScrollSection from "../components/sections/ScrollSection";
import { artworksThree } from "../data";
import ArtworkScrollCard from "../ui/ArtworkScrollCard";
import Banner from "../components/ads/Banner";
import SellCTA from "../components/selling/SellCTA";

function Sell() {
  return (
    <div className="page">
      <AdBanner background={false} />

      <SellingPoints>
        <PointItem
          title="Earn more from your sale"
          body="With lower fees than traditional auction houses, galleries and dealers, you take home more of the final sale price."
        >
          <EarnIcon />
        </PointItem>
        <PointItem
          title="Tap into our expertise"
          body="Our team has a wealth of experience in the secondary art market. A dedicated specialist will always be at your service."
        >
          <ExpertIcon />
        </PointItem>
        <PointItem
          title="Reach global buyers"
          body="With the world’s largest network of collectors, we match your work with the most interested buyers in over 30 countries."
        >
          <GlobalIcon />
        </PointItem>
      </SellingPoints>

      <StrategyComponent />

      <SellingSteps />

      <ScrollSection
        title="Previously sold on Art Angle"
        alignItems
        titleSize="big"
      >
        {artworksThree.map((artist) => (
          <ArtworkScrollCard key={artist.id} poster={artist} />
        ))}
      </ScrollSection>

      <Banner />

      <SellCTA />
    </div>
  );
}

export default Sell;
