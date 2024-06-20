import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSortDropdown,
  closeMediumDropdown,
  closeRarityDropdown,
  getGlobal,
  closePriceDropdown,
} from "../reducers/globalSlice";

import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";
import Modal from "../components/modal/Modal";

// import Spinner from "./Spinner";

function AppLayout() {
  const { sortDropdown, mediumDropdown, rarityDropdown, priceDropdown } =
    useSelector(getGlobal);
  const dispatch = useDispatch();

  function handleCloseDropdown(e) {
    // e.preventDefault();
    e.stopPropagation();
    if (sortDropdown) {
      dispatch(closeSortDropdown());
    } else if (mediumDropdown) {
      dispatch(closeMediumDropdown());
    } else if (rarityDropdown) {
      dispatch(closeRarityDropdown());
    } else if (priceDropdown) {
      dispatch(closePriceDropdown());
    } else {
      return;
    }
  }

  return (
    <div onClick={handleCloseDropdown}>
      <Navigation />
      {/* <Spinner /> */}
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
