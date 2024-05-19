import { useState } from "react";

export default function useScroll(containerEl, contentEl) {
  const [thumbPosition, setThumbPosition] = useState(0);

  const containerWidth = containerEl.offsetWidth;
  const contentWidth = containerEl.scrollWidth;
  const scrollLeft = containerEl.scrollLeft;
  console.log("scroll hook");
}
