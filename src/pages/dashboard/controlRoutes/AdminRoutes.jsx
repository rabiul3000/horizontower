import useUser from "../../../hooks/useUser";
import NotFound from "../../NotFound/NotFound";

const AdminRoutes = ({ children }) => {
  const { userRole } = useUser();

  if (userRole === "admin") {
    return children;
  }
  return <NotFound />;
};

export default AdminRoutes;
