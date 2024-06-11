import AdBanner from "../components/ads/AdBanner";
import PointItem from "../components/selling/PointItem";
import SellingPoints from "../components/selling/SellingPoints";
import EarnIcon from "../components/icons/EarnIcon";
import Spacer from "../ui/Spacer";
import ExpertIcon from "../components/icons/ExpertIcon";
import GlobalIcon from "../components/icons/GlobalIcon";
import StrategyComponent from "../components/selling/StrategyComponent";

function Sell() {
  return (
    <div className="page">
      {/* <Spacer /> */}

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

      <StrategyComponent></StrategyComponent>
    </div>
  );
}

export default Sell;
