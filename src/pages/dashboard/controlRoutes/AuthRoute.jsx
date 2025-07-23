import { Navigate } from "react-router";
import useUser from "../../../hooks/useUser";

const AuthRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
