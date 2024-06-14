import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  function onReset(event) {
    event.preventDefault();
    setValue("");
  }

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState);

    if (showPassword) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  return { passwordType, toggleShowPassword };
};
