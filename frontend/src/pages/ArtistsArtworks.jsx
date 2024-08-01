import { useEffect, useRef, useState } from "react";
import DetailedList from "../components/lists/DetailedList";
import DetailedListComponent from "../components/lists/DetailedListComponent";
import styles from "./ArtistsArtworks.module.css";
import SortButton from "../components/sort/SortButton";
import SortComponent from "../components/sort/SortComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  showSortDropdown,
  updateCurrentSort,
} from "../slices/globalSlice";
import Button from "../ui/Button";
import { getAuth } from "../slices/authSlice";
import { useArtistArtworksQuery } from "../slices/artworksApiSlice";

const sortArray = [
  "Price",
  "Date Published",
  "Visibility",
  "Title",
  "Original",
];

function ArtistsArtworks() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  //   const [isDropdown, setIsDropdown] = useState(false);
  const [selected, setSelected] = useState(0);

  const { sortDropdown } = useSelector(getGlobal);
  const { userInfo } = useSelector(getAuth);

  const { data: artworks } = useArtistArtworksQuery();

  const labelRef = useRef(null);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(updateCurrentSort(sortArray[0]));
  //   });

  function handleCheck() {
    setIsAllChecked((prevState) => !prevState);
  }

  function handleCancel() {
    setIsAllChecked(false);
  }

  function handleSort(index, sortItem) {
    setSelected((prevState) => (prevState !== index ? index : prevState));
    dispatch(updateCurrentSort(sortItem));
  }

  function openDropdown() {
    dispatch(showSortDropdown());
  }

  return (
    <div className="page">
      <section className="section_block">
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.headingContainer}>
              <div className={styles.heading}>
                <h3 className={styles.headingText}>My Original Artworks</h3>
              </div>
              <div className={styles.utilityContainer}>
                <div className={styles.sortContainer}>
                  <SortButton ref={labelRef} onClick={openDropdown} />
                </div>
                <div className={styles.btnContainer}>
                  <Button
                    as="a"
                    href={`/artist/${userInfo.id}/artwork/upload`}
                    size="small"
                  >
                    Add New Artwork
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.container}></div>
            <div className={styles.contentWrapper}>
              <DetailedListComponent
                isChecked={isAllChecked}
                onCheck={handleCheck}
                onCancel={handleCancel}
              >
                {artworks?.map((artwork) => (
                  <DetailedList
                    key={artwork.id}
                    artwork={artwork}
                    isAllChecked={isAllChecked}
                  />
                ))}
              </DetailedListComponent>
            </div>
          </div>

          <div>
            {sortDropdown && (
              <SortComponent
                ref={labelRef}
                items={sortArray}
                selected={selected}
                handleSort={handleSort}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArtistsArtworks;
