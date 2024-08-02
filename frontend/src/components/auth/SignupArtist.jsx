import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField, useIntersection, useShowPassword } from "../../hooks";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { getAuth } from "../../slices/authSlice";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
  updateUserType,
} from "../../slices/globalSlice";
import { years } from "../../helpers/generateYears";

import EyeIcon from "../icons/EyeIcon";
import FormInput from "../../ui/FormInput";
import FormComponent from "../forms/FormComponent";
import styles from "./SignupArtist.module.css";
import StyledTextArea from "../../ui/StyledTextArea";
import Onboarding from "./Onboarding";
import Spacer from "../../ui/Spacer";
import StyledSelect from "../../ui/StyledSelect";

function SignupArtist({ onSignup, onOpenModal }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  // const [isIntersecting, setIsIntersecting] = useState(false);
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
  const { onReset: resetAccountNumber, ...accountNumberProps } = accountNumber;
  const bankName = useField("text");
  const { onReset: resetBankName, ...bankNameProps } = bankName;

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(getAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      name.value === "" ||
      email.value === "" ||
      number.value === "" ||
      password.value === "" ||
      biography.value === "" ||
      specialisation.value === "" ||
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

  async function signupHandler(e) {
    e.preventDefault();
    // if (userInfo && userInfo.email === email.value) {
    //   dispatch(updateSuccessMgs("Already logged in"));
    //   dispatch(enableError());
    //   return;
    // }
    try {
      const names = name.value.split(" ");

      const userDetails = {
        firstname: names[0],
        lastname: names[1],
        email: email.value,
        contactNumber: number.value,
        password: password.value,
        birthYear,
        specialisation: specialisation.value,
        biography: biography.value,
        portfolioLinks: [portfolio.value],
        paymentDetails: {
          accountName: accountName.value,
          accountNumber: accountNumber.value,
          bankName: bankName.value,
        },
        userType: "artist",
      };

      const res = await register(userDetails).unwrap();
      // dispatch(setCredentials({ ...res }));
      dispatch(updateSuccessMgs(res.message));
      dispatch(enableSuccess());
      dispatch(updateUserType("artist"));
      resetName(e);
      resetEmail(e);
      resetNumber(e);
      resetPassword(e);
      resetBiography(e);
      resetSpecialisation(e);
      resetPortfolio(e);
      resetAccountName(e);
      resetAccountNumber(e);
      resetBankName(e);
      onOpenModal("Login");
      // onSignup?.();
    } catch (err) {
      const errMsg = err?.data?.message;
      dispatch(updateSuccessMgs(errMsg || err.error));
      dispatch(enableError());
      console.log(errMsg);
    }
  }

  function handleSelect(label, selection) {
    console.log(selection);
    setBirthYear(selection);
  }

  return (
    <div className={styles.wrapper}>
      <Onboarding
        closeModal={onSignup}
        introText="Sign up as artist to start selling art on Nigeria’s leading online
              art store"
      />

      <div className={styles.contents}>
        <FormComponent
          type="signup"
          disable={isDisabled}
          onConfirm={signupHandler}
          onOpenModal={onOpenModal}
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

          <Spacer small />

          <div className={styles.formSectionHeader}>Artistic Information</div>
          <StyledSelect
            placeholder="Select year of birth"
            options={years}
            onSelect={handleSelect}
          />
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

          <Spacer small />

          <div className={styles.formSectionHeader}>Payment Details</div>
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
  );
}

export default SignupArtist;
