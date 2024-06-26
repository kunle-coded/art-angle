import DropdownComponent from "../../ui/DropdownComponent";
import Spacer from "../../ui/Spacer";
import styles from "./AllFilters.module.css";
import SearchField from "../../ui/SearchField";
import PriceSlider from "./PriceSlider";
import {
  artists,
  rarity,
  medium,
  materials,
  waysToBuy,
  timePeriod,
  colors,
  artGalleries,
  locations,
} from "../../data";
import SizeComponent from "../../ui/SizeComponent";

function AllFilters({ onCloseModal }) {
  const artistsNames = artists.map((artist) => artist.name);
  return (
    <div className={styles.slideIn}>
      <div className={styles.modalHeader}>
        <div className={styles.modalTitle}>Filters</div>

        <button className={styles.modalClose} onClick={onCloseModal}>
          <div className={styles.icon}>
            <svg
              viewBox="0 0 18 18"
              fill="currentColor"
              style={{
                position: "absolute",
                inset: "0px",
                width: "100%",
                height: "100%",
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.88006 9.00001L14.4401 13.56L13.5601 14.44L9.00006 9.88001L4.44006 14.44L3.56006 13.56L8.12006 9.00001L3.56006 4.44001L4.44006 3.56001L9.00006 8.12001L13.5601 3.56001L14.4401 4.44001L9.88006 9.00001Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <Spacer />
      <DropdownComponent title="Keyword Search">
        <SearchField placeholder="Enter a search term" />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent items={artistsNames} title="Artists" />
      <Spacer />
      <DropdownComponent items={rarity} title="Rarity" />
      <Spacer />
      <DropdownComponent items={medium} title="Medium" />
      <Spacer />
      <DropdownComponent title="Price">
        <PriceSlider />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent title="Size">
        <SizeComponent />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent items={waysToBuy} title="Ways to Buy" />
      <Spacer />
      <DropdownComponent items={materials} title="Materials">
        <SearchField placeholder="Enter a material" />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent items={locations} title="Artwork Location">
        <SearchField placeholder="Enter a city" />
      </DropdownComponent>
      <Spacer />
      <DropdownComponent items={timePeriod} title="Time Periods" />
      <Spacer />
      <DropdownComponent items={colors} title="Color" customWidth={true} />
      <Spacer />
      <DropdownComponent
        items={artGalleries}
        title="Galleries and Institutions"
      >
        <SearchField placeholder="Enter a gallery" />
      </DropdownComponent>
    </div>
  );
}

export default AllFilters;
