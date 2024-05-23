import { useEffect, useState } from "react";

function useSticky(target) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    function observerFunction(entries) {
      const [entry] = entries;

      setIsIntersecting(entry.isIntersecting);

      //   observer.unobserve(entry.target);
    }

    const options = {
      root: null,
      rootMargin: "0px 0px -100%",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerFunction, options);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return isIntersecting;
}

export default useSticky;
