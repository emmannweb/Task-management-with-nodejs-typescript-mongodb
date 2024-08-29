import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo?.role === "user" && userInfo?.active === true ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default UserRoute;
