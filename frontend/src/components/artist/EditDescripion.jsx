import { useState } from "react";
import EditHeader from "../../ui/EditHeader";
import styles from "./EditDescription.module.css";
import StyledGrid from "../../ui/StyledGrid";

const subCatYr = [
  { id: 0, label: "Subject", value: "Portraiture" },
  { id: 1, label: "Category", value: "Contemporary Art" },
  { id: 2, label: "Year", value: "2022" },
];

function EditDescripion() {
  const [isEdit, setIsEdit] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);
  // const [currentItem, setCurrentItem] = useState(0);

  function handleEdit() {
    setIsEdit((prevState) => !prevState);
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <EditHeader
          heading="Description"
          isEdit={isEdit}
          onClick={handleEdit}
        />

        <div className={styles.contentContainer}>
          <StyledGrid
            title="Subject, Category, Year"
            gridList={subCatYr}
            isEdit={isEdit}
          />
          <StyledGrid title="Mediums, Materials, Styles" />
        </div>
      </div>
    </div>
  );
}

export default EditDescripion;
