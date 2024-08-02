import { useEffect, useState } from "react";
import { useField } from "../../hooks";
import LabeledInput from "../../ui/LabeledInput";
import styles from "./ArtistDetailsTab.module.css";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import EditIconFilled from "../icons/EditIconFilled";
import DividerLine from "../../ui/DividerLine";

function ArtistDetailsTab({
  children,
  title = "",
  isPassword = false,
  isEditing,
  isEdit,
  onEdit,
  onSave,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <div className={styles.header}>
          <div className={styles.headerText}>{title}</div>
          <div className={styles.headerBtn}>
            {!isEdit && !isEditing && (
              <ButtonWithIcon text="Edit" type="secondary" onClick={onEdit}>
                <EditIconFilled />
              </ButtonWithIcon>
            )}

            {(isEdit || isEditing) && (
              <ButtonWithIcon text="Save" onClick={onSave} />
            )}
          </div>
        </div>
      </div>

      <DividerLine />

      <div className={styles.contentContainer}>
        {children}

        {isPassword && (
          <div className={styles.infoContainer}>
            <div className={styles.infoSpapcer}></div>

            <div className={styles.passwordInfo}>
              <p>
                Password must be at least 8 characters and include a lowercase
                letter,uppercase letter, and digit.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistDetailsTab;
