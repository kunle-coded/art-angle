import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { getAuth, setCredentials } from "../../slices/authSlice";
import {
  disableProfileDropdown,
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";
import { useField, useShowPassword } from "../../hooks";

import styles from "./Login.module.css";

import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import Onboarding from "./Onboarding";
import Spinner from "../../ui/Spinner";

function Login({ onCloseModal, onOpenModal }) {
  const { passwordType, toggleShowPassword } = useShowPassword();

  const email = useField("email");
  const { onReset: resetEmail, ...emailProps } = email;
  const password = useField(passwordType);
  const { onReset: resetPassword, ...passwordProps } = password;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(getAuth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  async function handleLogin(e) {
    e.preventDefault();
    if (userInfo && userInfo.email === email.value) {
      dispatch(updateSuccessMgs("Already logged in"));
      dispatch(enableError());
      return;
    }
    try {
      const user = {
        email: email.value,
        password: password.value,
      };

      const res = await login(user).unwrap();
      dispatch(setCredentials({ ...res }));
      dispatch(updateSuccessMgs("Login successful"));
      dispatch(enableSuccess());
      dispatch(disableProfileDropdown());
      resetEmail(e);
      resetPassword(e);
      onCloseModal?.();
    } catch (error) {
      const errMsg = error?.data?.message;
      dispatch(updateSuccessMgs(errMsg));
      dispatch(enableError());
    }
  }

  return (
    <div className={styles.wrapper}>
      <Onboarding
        introText="Log in to start collecting art by Nigeria’s leading artists"
        closeModal={onCloseModal}
      />
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}

export default Login;
