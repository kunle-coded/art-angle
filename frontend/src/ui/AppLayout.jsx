import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeDropdown, getGlobal } from "../reducers/globalSlice";

import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";

// import Spinner from "./Spinner";

function AppLayout() {
  const { showSortDropdown } = useSelector(getGlobal);
  const dispatch = useDispatch();

  function handleCloseDropdown(e) {
    if (!showSortDropdown) return;
    dispatch(closeDropdown());
  }

  return (
    <div onClick={handleCloseDropdown}>
      <Navigation />
      {/* <Spinsner /> */}

      <main>
        <div style={{ overflow: "hidden" }}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
