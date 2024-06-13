import FullButton from "../../ui/FullButton";
import GoogleIcon from "../icons/GoogleIcon";
import EyeIcon from "../icons/EyeIcon";
import styles from "./Login.module.css";
import FormInput from "../../ui/FormInput";
import { useState } from "react";

function Login() {
  const [isPassword, setIsPassword] = useState(false);

  function togglePasswordView() {
    setIsPassword((prevState) => !prevState);
  }
  return (
    <div className={styles.contentContainer}>
      <div className={styles.introText}>
        Log in to start collecting art by Nigeria’s leading artists
      </div>

      <div className={styles.form}>
        <FormInput placeholder="Email" />
        <FormInput
          type="password"
          placeholder="Password"
          isPassword={isPassword}
          onHidePassword={togglePasswordView}
        >
          <EyeIcon isPassword={isPassword} />
        </FormInput>
        <div className={styles.passwordOption}>
          <button className={styles.optionButton}>Forgot password?</button>
        </div>
      </div>

      <div className={styles.buttons}>
        <FullButton>Login</FullButton>
        <div className={styles.option}>or</div>
        <FullButton type="secondary">
          <div className={styles.iconWrapper}>
            <GoogleIcon />
          </div>
          Continue with Google
        </FullButton>
      </div>

      <div className={styles.loginOption}>
        Don’t have an account?
        <button className={styles.optionButton}>Sign up.</button>
      </div>
    </div>
  );
}

export default Login;
