import { useEffect, useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import styles from "./SignupArtist.module.css";
import LogoIcon from "../icons/LogoIcon";
import { useField, useShowPassword } from "../../hooks";
import StyledTextArea from "../../ui/StyledTextArea";

function SignupArtist({ onSignup }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { passwordType, toggleShowPassword } = useShowPassword();

  const name = useField("text");
  const { onReset: resetName, ...nameProps } = name;
  const email = useField("email");
  const { onReset: resetEmail, ...emailProps } = email;
  const number = useField("number");
  const { onReset: resetNumber, ...numberProps } = number;
  const password = useField(passwordType);
  const { onReset: resetPassword, ...passwordProps } = password;
  const biography = useField("textarea");
  const { onReset: resetBiography, ...biographyProps } = biography;
  const specialisation = useField("text");
  const { onReset: resetSpecialisation, ...specialisationProps } =
    specialisation;
  const portfolio = useField("text");
  const { onReset: resetPortfolio, ...portfolioProps } = portfolio;
  const accountName = useField("text");
  const { onReset: resetAccountName, ...accountNameProps } = accountName;
  const accountNumber = useField("number");
  const { onReset: resetaccountNumber, ...accountNumberProps } = accountNumber;
  const bankName = useField("text");
  const { onReset: resetbankName, ...bankNameProps } = bankName;

  useEffect(() => {
    if (
      name.value === "" ||
      email.value === "" ||
      number.value === "" ||
      password.value === "" ||
      biography.value === "" ||
      specialisation.value === "" ||
      portfolio.value === "" ||
      accountName.value === "" ||
      accountNumber.value === "" ||
      bankName.value === ""
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    accountName.value,
    accountNumber.value,
    bankName.value,
    biography.value,
    email.value,
    name.value,
    number.value,
    password.value,
    portfolio.value,
    specialisation.value,
  ]);

  function handleSignup() {
    const userDetails = {
      name: name.value,
      email: email.value,
      contactNumber: number.value,
      password: password.value,
      specialisation: specialisation.value,
      portfolio: portfolio.value,
      accountName: accountName.value,
      accountNumber: accountNumber.value,
      bankName: bankName.value,
    };

    onSignup?.();
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
            disable={isDisabled}
            onConfirm={handleSignup}
          >
            <div className={styles.formSectionHeader}>Personal Information</div>

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
              placeholder="Enter your contact number"
              label="Contact number"
              {...numberProps}
            />
            <FormInput
              placeholder="Enter your password"
              label="Password"
              onHidePassword={toggleShowPassword}
              {...passwordProps}
            >
              <EyeIcon isPassword={passwordType === "password"} />
            </FormInput>
            <div className={styles.formSectionHeaderTwo}>
              Artistic Information
            </div>
            <StyledTextArea
              placeholder="Enter your biography"
              label="Biography"
              {...biographyProps}
            />
            <FormInput
              placeholder="Enter your specialisation"
              label="Specialisation"
              {...specialisationProps}
            />
            <FormInput
              placeholder="Enter your portfolio link"
              label="Portfolio link"
              {...portfolioProps}
            />

            <div className={styles.formSectionHeaderTwo}>Payment Details</div>
            <FormInput
              placeholder="Enter your account name"
              label="Account name"
              {...accountNameProps}
            />
            <FormInput
              placeholder="Enter your account number"
              label="Account number"
              {...accountNumberProps}
            />
            <FormInput
              placeholder="Enter your bank name"
              label="Bank name"
              {...bankNameProps}
            />
          </FormComponent>
        </div>
      </div>
    </div>
  );
}

export default SignupArtist;
