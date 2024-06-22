import { useEffect } from "react";
import { useField } from "../hooks";
import LabeledInput from "./LabeledInput";
import styles from "./UserDetailsTab.module.css";

function UserDetailsTab({ display, onEdit }) {
  const password = useField("text");
  const { onReset: resetPassword, ...passwordProps } = password;
  const confirmPassword = useField("text");
  const { onReset: resetconfirmPassword, ...confirmPasswordProps } =
    confirmPassword;

  useEffect(() => {
    if (password.value) {
      onEdit(true);
    } else {
      onEdit(false);
    }
  }, [onEdit, password.value]);

  return (
    <div className={styles.contentContainer}>
      <LabeledInput label="First Name" display={display} displayText="John" />
      <LabeledInput label="Last Name" display={display} displayText="Doe" />
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
  );
}

export default UserDetailsTab;
