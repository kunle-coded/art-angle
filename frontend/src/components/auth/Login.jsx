import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { getAuth, setCredentials } from "../../slices/authSlice";
import {
  deleteUserType,
  disableProfileDropdown,
  enableError,
  enableSuccess,
  getGlobal,
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
  const { userType } = useSelector(getGlobal);

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
      dispatch(disableProfileDropdown());
      dispatch(deleteUserType());
      resetEmail(e);
      resetPassword(e);
      onCloseModal?.();
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.errror));
      dispatch(enableError());
    }
  }

  return (
    <div className={styles.wrapper}>
      <Onboarding
        introText={`Log in to start ${
          userType === "buyer"
            ? "collecting art by Nigeria’s leading artists"
            : "selling art to art lovers worldwide"
        }`}
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
              passwordInfo={false}
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
