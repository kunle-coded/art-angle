import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSortDropdown,
  closeMediumDropdown,
  closeRarityDropdown,
  getGlobal,
} from "../reducers/globalSlice";

import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";

// import Spinner from "./Spinner";

function AppLayout() {
  const { sortDropdown, mediumDropdown, rarityDropdown } =
    useSelector(getGlobal);
  const dispatch = useDispatch();

  function handleCloseDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (sortDropdown) {
      dispatch(closeSortDropdown());
    } else if (mediumDropdown) {
      dispatch(closeMediumDropdown());
    } else if (rarityDropdown) {
      dispatch(closeRarityDropdown());
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
