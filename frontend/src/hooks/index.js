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

export function useIntersect(root, target) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!root.current || !target.current) return;

      const rootRect = root.current.getBoundingClientRect();
      const targetRect = target.current.getBoundingClientRect();

      // Check if the target element intersects with the root element
      // const isIntersect = targetRect.top > rootRect.bottom;
      // if (targetRect.top > rootRect.bottom) {
      //   console.log("intersecting", isIntersecting);
      //   setIsIntersecting(true);
      // } else {
      //   console.log("not intersecting", isIntersecting);
      //   setIsIntersecting(false);
      // }

      const isIntersecting =
        targetRect.top <= rootRect.bottom && targetRect.bottom >= rootRect.top;
      setIsIntersecting(!isIntersecting);
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

export function useIntersection(root, target) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!root.current || !target.current) return;

    function observerFunction(entries) {
      const [entry] = entries;

      setIsIntersecting(entry.isIntersecting);
    }

    const options = {
      root: root.current,
      rootMargin: "0px",
      // threshold: [0],
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    const observer = new IntersectionObserver(observerFunction, options);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [root, target]);

  return isIntersecting;
}
