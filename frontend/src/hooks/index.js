import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

export const useUrlParams = () => {
  const location = useLocation();

  const getUrlParams = (key) => {
    const params = new URLSearchParams(location.search);
    const priceRange = params.get("price_range");

    if (key === "price_range" && priceRange) {
      const range = priceRange.split("-");

      const minPrice = range[0];
      const maxPrice = range[1];

      return { minPrice, maxPrice };
    } else {
      const searchParam = params.get(key);

      return searchParam;
    }
  };

  return getUrlParams;
};

export const useUpdateUrlParams = () => {
  const location = useLocation();

  const updateUrlParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);

    Object.keys(newParams).forEach((key) => {
      searchParams.set(key, newParams[key]);
    });

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return updateUrlParams;
};

export const useDeleteUrlParams = () => {
  const location = useLocation();

  const removeUrlParams = (key, valueToRemove) => {
    console.log("current location  ", location);
    const searchParams = new URLSearchParams(location.search);

    const existingParam = searchParams.get(key);
    console.log("existing param ", existingParam);

    // Get the current values and split them into an array
    const values = searchParams.get(key)?.split(" ") || [];
    console.log("key & value to remove", values);
    console.log("removing values", searchParams);

    // Filter out the value to be removed
    const filteredValues = values.filter((v) => v !== valueToRemove);

    console.log("filtered ", filteredValues);

    if (filteredValues.length > 0) {
      // If there are still values left, update the parameter
      searchParams.set(key, filteredValues.join("+"));
    } else {
      searchParams.delete(key);
    }

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return removeUrlParams;
};

export const useClearUrlParams = (key, value) => {
  const location = useLocation();

  const clearParams = () => {
    const newUrl = location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  return clearParams;
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

export const useKeyPress = (key, callback) => {
  const handleKeyDown = (event) => {
    if (event.key === key) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return handleKeyDown;
};

export const emptyObject = (object) => {
  if (Object.keys(object).length === 0) {
    return true;
  } else {
    return false;
  }
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
