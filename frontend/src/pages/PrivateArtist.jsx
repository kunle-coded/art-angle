import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../slices/authSlice";

function PrivateArtist({ children }) {
  const { userInfo } = useSelector(getAuth);

  return userInfo && userInfo.userType === "artist" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateArtist;
