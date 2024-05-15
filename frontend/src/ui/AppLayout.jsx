import { Outlet } from "react-router-dom";
import Navigation from "../components/header/Navigation";

// import Spinner from "./Spinner";

function AppLayout() {
  return (
    <div>
      <Navigation />
      {/* <Spinner /> */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
