import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import styles from "./SignupArtist.module.css";
import LogoIcon from "../icons/LogoIcon";

function SignupArtist({ type = "" }) {
  const [isPassword, setIsPassword] = useState(false);

  function togglePasswordView() {
    setIsPassword((prevState) => !prevState);
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
            heading="Sign up as artist to start selling art on Nigeria’s leading online art store"
          >
            <FormInput placeholder="Enter your full name" label="Name" />
            <FormInput placeholder="Enter your email" label="Email" />
            <FormInput
              type="password"
              placeholder="Enter your password"
              label="Password"
              isPassword={isPassword}
              onHidePassword={togglePasswordView}
            >
              <EyeIcon isPassword={isPassword} />
            </FormInput>
          </FormComponent>
        </div>
      </div>
    </div>
  );
}

export default SignupArtist;
