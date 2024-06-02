import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDropdown,
  closeFilterDropdown,
  getGlobal,
} from "../reducers/globalSlice";

import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";

// import Spinner from "./Spinner";

function AppLayout() {
  const { showSortDropdown, filterDropdown } = useSelector(getGlobal);
  const dispatch = useDispatch();

  function handleCloseDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (showSortDropdown) {
      dispatch(closeDropdown());
    } else if (filterDropdown) {
      dispatch(closeFilterDropdown());
    } else {
      return;
    }
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
