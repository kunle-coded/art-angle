import { Outlet } from "react-router-dom";
import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";

// import Spinner from "./Spinner";

function AppLayout() {
  return (
    <div>
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
