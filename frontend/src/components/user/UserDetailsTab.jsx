import { useEffect, useState } from "react";
import { useField } from "../../hooks";
import LabeledInput from "../../ui/LabeledInput";
import styles from "./UserDetailsTab.module.css";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import EditIconFilled from "../icons/EditIconFilled";
import DividerLine from "../../ui/DividerLine";

function UserDetailsTab() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const password = useField("text");
  const { onReset: resetPassword, ...passwordProps } = password;
  const confirmPassword = useField("text");
  const { onReset: resetconfirmPassword, ...confirmPasswordProps } =
    confirmPassword;

  useEffect(() => {
    if (password.value) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [password.value]);

  function handleEdit(e) {
    setIsEdit((prevState) => !prevState);
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <div className={styles.header}>
          {!isEdit && !isEditing && (
            <ButtonWithIcon text="Edit" type="secondary" onClick={handleEdit}>
              <EditIconFilled />
            </ButtonWithIcon>
          )}

          {(isEdit || isEditing) && (
            <ButtonWithIcon text="Save" onClick={handleEdit} />
          )}
        </div>
      </div>

      <DividerLine />

      <div className={styles.contentContainer}>
        <LabeledInput label="First Name" display={!isEdit} displayText="John" />
        <LabeledInput label="Last Name" display={!isEdit} displayText="Doe" />
        <LabeledInput
          label="Email Address"
          display
          displayText="johndoe@email.com"
        />
        <LabeledInput
          label="New Password"
          placeholder="New Password"
          {...passwordProps}
        />

        <div className={styles.errorContainer}>
          <div className={styles.errorSidebar}></div>
          <div className={styles.errorMessage}>
            Incorrect password. Please check and try again.
          </div>
        </div>

        <LabeledInput
          label="Confirm Password"
          placeholder="Confirm Password"
          {...confirmPasswordProps}
        />

        <div className={styles.infoContainer}>
          <div className={styles.infoSpapcer}></div>

          <div className={styles.passwordInfo}>
            <p>
              Password must be at least 8 characters and include a lowercase
              letter,uppercase letter, and digit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsTab;
