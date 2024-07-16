import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";
import { getGlobal } from "../slices/globalSlice";

function Private({ children }) {
  const { userInfo } = useSelector(getAuth);
  const { isLogout } = useSelector(getGlobal);

  return userInfo ? children : !isLogout && <Navigate to="/login" replace />;
}

export default Private;
