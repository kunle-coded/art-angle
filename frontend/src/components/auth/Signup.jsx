import { useEffect, useState } from "react";
import { useSignup } from "./useSignup";
import { useField, useShowPassword } from "../../hooks";

import styles from "./Signup.module.css";
import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import Intro from "./Intro";
import SignupArtist from "./SignupArtist";
import Onboarding from "./Onboarding";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../slices/authSlice";
import {
  disableProfileDropdown,
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";

function Signup({ onCloseModal, onOpenModal }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isArtistSignup, setIsArtistSignup] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { passwordType, toggleShowPassword } = useShowPassword();

  const name = useField("text");
  const { onReset: resetName, ...nameProps } = name;
  const email = useField("email");
  const { onReset: resetEmail, ...emailProps } = email;
  const password = useField(passwordType);
  const { onReset: resetPassword, ...passwordProps } = password;

  useEffect(() => {
    if (name.value === "" || email.value === "" || password.value === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email.value, name.value, password.value]);

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(getAuth);

  const dispatch = useDispatch();

  async function singupHandler(e) {
    e.preventDefault();
    if (userInfo && userInfo.email === email.value) {
      dispatch(updateSuccessMgs("Already logged in"));
      dispatch(enableError());
      return;
    }
    try {
      const names = name.value.split(" ");
      const newUser = {
        firstname: names[0],
        lastname: names[1],
        email: email.value,
        password: password.value,
        userType: "buyer",
      };

      const res = await register(newUser).unwrap();
      // dispatch(setCredentials({ ...res }));
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      // dispatch(disableProfileDropdown());
      resetEmail(e);
      resetPassword(e);
      // onCloseModal?.();
      onOpenModal("Login");
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
    }
  }

  function openSignup() {
    setIsSignup(true);
  }

  function openArtistSignup() {
    setIsArtistSignup(true);
  }

  if (!isSignup && !isArtistSignup) {
    return (
      <Intro
        onSignup={openSignup}
        onArtistSignup={openArtistSignup}
        onCloseModal={onCloseModal}
        onOpenModal={onOpenModal}
      />
    );
  }

  if (isArtistSignup) {
    return <SignupArtist onSignup={onCloseModal} onOpenModal={onOpenModal} />;
  }

  return (
    <div className={styles.wrapper}>
      <Onboarding
        closeModal={onCloseModal}
        introText="Sign up to start collecting art by Nigeria’s leading artists"
      />
      <div className={styles.contents}>
        <FormComponent
          type="signup"
          disable={isDisabled}
          onConfirm={singupHandler}
          onOpenModal={onOpenModal}
        >
          <FormInput
            placeholder="Enter your full name"
            label="Name"
            {...nameProps}
          />
          <FormInput
            placeholder="Enter your email"
            label="Email"
            {...emailProps}
          />
          <FormInput
            placeholder="Enter your password"
            label="Password"
            onHidePassword={toggleShowPassword}
            {...passwordProps}
          >
            <EyeIcon isPassword={passwordType === "password"} />
          </FormInput>
        </FormComponent>
      </div>
    </div>
  );
}

export default Signup;
