import { useState, useEffect } from "react";

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

export function useIntersection(root, target) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!root.current || !target.current) return;

      const rootRect = root.current.getBoundingClientRect();
      const targetRect = target.current.getBoundingClientRect();

      // Check if the target element intersects with the root element
      const isIntersect = targetRect.top > rootRect.bottom;
      if (targetRect.top > rootRect.bottom) {
        console.log("intersecting", isIntersecting);
        setIsIntersecting(true);
      } else {
        console.log("not intersecting", isIntersecting);
        setIsIntersecting(false);
      }
    };

    // Attach the scroll event listener
    const targetElement = target.current;
    targetElement.addEventListener("scroll", handleScroll);

    // Initial check in case the target element is already in view
    // handleScroll();

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
    };
  }, [isIntersecting, root, target]);

  return isIntersecting;
}
