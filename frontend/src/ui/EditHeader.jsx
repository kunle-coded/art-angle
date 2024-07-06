import EditIconFilled from "../components/icons/EditIconFilled";
import ButtonWithIcon from "./ButtonWithIcon";
import styles from "./EditHeader.module.css";

function EditHeader({ heading = "", isEdit, onClick }) {
  return (
    <div className={styles.contentHeader}>
      <div className={styles.wrapper}>
        <div className={styles.headerText}>{heading}</div>
        <div className={styles.header}>
          {!isEdit && (
            <ButtonWithIcon text="Edit" type="secondary" onClick={onClick}>
              <EditIconFilled />
            </ButtonWithIcon>
          )}

          {isEdit && <ButtonWithIcon text="Save" onClick={onClick} />}
        </div>
      </div>
    </div>
  );
}

export default EditHeader;
