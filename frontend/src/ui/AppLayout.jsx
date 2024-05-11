import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Spinner from "./Spinner";

function AppLayout() {
  return (
    <div>
      <Navbar />
      {/* <Spinner /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
