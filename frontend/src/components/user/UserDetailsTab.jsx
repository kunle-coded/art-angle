import { useEffect, useState } from "react";
import { useField } from "../../hooks";
import LabeledInput from "../../ui/LabeledInput";
import styles from "./UserDetailsTab.module.css";
import ButtonWithIcon from "../../ui/ButtonWithIcon";
import EditIconFilled from "../icons/EditIconFilled";
import DividerLine from "../../ui/DividerLine";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, setCredentials } from "../../slices/authSlice";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/usersApiSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import Spinner from "../../ui/Spinner";

function UserDetailsTab() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { userInfo } = useSelector(getAuth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  // const { data } = useProfileQuery();

  const dispatch = useDispatch();

  const password = useField("password");
  const { onReset: resetPassword, ...passwordProps } = password;
  const confirmPassword = useField("password");
  const { onReset: resetconfirmPassword, ...confirmPasswordProps } =
    confirmPassword;

  useEffect(() => {
    if (password.value) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [password.value]);

  function handleEdit() {
    setIsEdit((prevState) => !prevState);
  }

  async function updateHandler(e) {
    e.preventDefault();

    if (!firstName && !lastName && !password.value) {
      handleEdit();
      return;
    }

    if (password.value && password.value !== confirmPassword.value) {
      dispatch(updateSuccessMgs("Passwords do not match"));
      dispatch(enableError());
      return;
    }

    const userData = {};

    if (firstName) {
      userData.firstname = firstName;
    }
    if (lastName) {
      userData.lastname = lastName;
    }
    if (password.value) {
      userData.password = password.value;
    }

    try {
      const res = await updateProfile(userData).unwrap();
      // dispatch(setCredentials(data));
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      handleEdit();

      setFirstName("");
      setLastName("");
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
      console.log(err);
    }
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
            <ButtonWithIcon text="Save" onClick={updateHandler} />
          )}
        </div>
      </div>

      <DividerLine />

      {isLoading && <Spinner />}

      <div className={styles.contentContainer}>
        <LabeledInput
          label="First Name"
          display={!isEdit}
          displayText={userInfo.firstname}
          onInput={setFirstName}
        />
        <LabeledInput
          label="Last Name"
          display={!isEdit}
          displayText={userInfo.lastname}
          onInput={setLastName}
        />
        <LabeledInput
          label="Email Address"
          display
          displayText={userInfo.email}
        />
        <LabeledInput
          label="New Password"
          placeholder="New Password"
          autoComplete="new-password"
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
          autoComplete="new-password"
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
