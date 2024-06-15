import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField, useShowPassword } from "../../hooks";
import { login } from "../../reducers/userSlice";

import styles from "./Login.module.css";

import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import LogoIcon from "../icons/LogoIcon";

function Login({ onCloseModal }) {
  const { passwordType, toggleShowPassword } = useShowPassword();

  const email = useField("text");
  const { onReset: resetEmail, ...emailProps } = email;
  const password = useField(passwordType);
  const { onReset: resetPassword, ...passwordProps } = password;

  const dispatch = useDispatch();

  function handleLogin(e) {
    const user = {
      email: email.value,
      password: password.value,
    };

    dispatch(login(user));
    resetEmail(e);
    resetPassword(e);
    onCloseModal?.();
  }

  console.log(email.value !== "");

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
            heading="Log in to start collecting art by Nigeria’s leading artists"
            disable={email.value === "" || password.value === ""}
            onConfirm={handleLogin}
          >
            <FormInput
              placeholder="Enter your email address"
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

export default Login;
