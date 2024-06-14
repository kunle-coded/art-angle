import { useState } from "react";
import { useField, useShowPassword } from "../../hooks";
import { useDispatch } from "react-redux";
import { register } from "../../reducers/userSlice";

import styles from "./Signup.module.css";
import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import LogoIcon from "../icons/LogoIcon";
import Intro from "./Intro";
import SignupArtist from "./SignupArtist";

function Signup({ onCloseModal }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isArtistSignup, setIsArtistSignup] = useState(false);
  const { passwordType, toggleShowPassword } = useShowPassword();

  const name = useField("text");
  const { onReset: resetName, ...nameProps } = name;
  const email = useField("email");
  const { onReset: resetEmail, ...emailProps } = email;
  const password = useField(passwordType);
  const { onReset: resetPassword, ...passwordProps } = password;

  const dispatch = useDispatch();

  function handleSignUp(e) {
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    dispatch(register(newUser));
    resetName(e);
    resetEmail(e);
    resetPassword(e);
    onCloseModal();
  }

  function openSignup() {
    setIsSignup(true);
  }

  function openArtistSignup() {
    setIsArtistSignup(true);
  }

  if (!isSignup && !isArtistSignup) {
    return <Intro onSignup={openSignup} onArtistSignup={openArtistSignup} />;
  }

  if (isArtistSignup) {
    return <SignupArtist />;
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <div className={styles.logoInner}>
            <LogoIcon />
          </div>
          <div className={styles.logoText}>Art Angle</div>
        </div>
        <div className={styles.contents}>
          <FormComponent
            type="signup"
            heading="Sign up to start collecting art by Nigeria’s leading artists"
            onConfirm={handleSignUp}
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
    </div>
  );
}

export default Signup;
