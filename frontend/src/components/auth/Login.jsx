import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField, useShowPassword } from "../../hooks";
import { login } from "../../reducers/userSlice";

import styles from "./Login.module.css";

import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import Onboarding from "./Onboarding";

function Login({ onCloseModal, onOpenModal }) {
  const { passwordType, toggleShowPassword } = useShowPassword();

  const email = useField("email");
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

  return (
    <div className={styles.wrapper}>
      <Onboarding
        introText="Log in to start collecting art by Nigeria’s leading artists"
        closeModal={onCloseModal}
      />
      <div className={styles.contents}>
        <FormComponent
          disable={email.value === "" || password.value === ""}
          onConfirm={handleLogin}
          onOpenModal={onOpenModal}
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
  );
}

export default Login;
