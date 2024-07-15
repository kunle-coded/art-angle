import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";

function Private({ children }) {
  const { userInfo } = useSelector(getAuth);

  return userInfo ? children : <Navigate to="/login" replace />;
}

export default Private;
