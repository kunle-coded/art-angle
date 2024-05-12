import { useState } from "react";
import Header from "./Header";
import MegaMenu from "./MegaMenu";

function Navigation() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div>
      <Header
        onEnter={() => setIsHover(true)}
        onLeave={() => setIsHover(false)}
      />
      <MegaMenu isShow={isHover} />
    </div>
  );
}

export default Navigation;
