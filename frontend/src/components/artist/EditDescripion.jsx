import EditHeader from "../../ui/EditHeader";
import styles from "./EditDescription.module.css";

function EditDescripion({ title = "", isEdit, onClick, onCancel, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <EditHeader
          heading={title}
          isEdit={isEdit}
          onClick={onClick}
          onCancel={onCancel}
        />

        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
}

export default EditDescripion;
