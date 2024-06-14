import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";

function Signup({ type = "" }) {
  const [isPassword, setIsPassword] = useState(false);

  function togglePasswordView() {
    setIsPassword((prevState) => !prevState);
  }

  return (
    <div className="container">
      <FormComponent
        type="signup"
        heading="Sign up to start collecting art by Nigeria’s leading artists"
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
  );
}

export default Signup;
